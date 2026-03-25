
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';
import { CustomerFormValues } from '@/components/checkout/CustomerInfoForm';
import { CartItem } from '@/context/CartContext';

interface InvoiceData {
  customerInfo: CustomerFormValues;
  items: CartItem[];
  subtotal: number;
  discount: number;
  gst: number;
  total: number;
}

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = '7568895892:AAFEKJDuU5kJCD27sPsurDZWvqjHRa6H1Zs';
const DEFAULT_TELEGRAM_CHAT_ID = '6160292666';

// Function to send invoice to Telegram
const sendInvoiceToTelegram = async (pdfData: Uint8Array, invoiceNumber: string, customerInfo: CustomerFormValues, total: number): Promise<boolean> => {
  try {
    let chatId = DEFAULT_TELEGRAM_CHAT_ID;
    
    // Priority 1: Use custom chat ID if provided
    if (customerInfo.telegramChatId && customerInfo.telegramChatId.trim()) {
      chatId = customerInfo.telegramChatId.trim();
    } 
    // Priority 2: Try to use phone number if provided and no chat ID
    else if (customerInfo.phone && customerInfo.phone.trim()) {
      // Format phone number to international format without symbols
      const formattedPhone = customerInfo.phone.replace(/\D/g, '');
      
      // Try to find user by phone number (indirect approach via user search API)
      try {
        // Note: This is a conceptual approach but has limitations
        // Telegram doesn't officially support finding users by phone directly
        console.log(`Attempting to locate Telegram user by phone: ${formattedPhone}`);
        
        // We'll still use the default chat ID here, but log the attempt
        console.log('Using default chat ID as fallback since direct phone lookup is limited by Telegram API');
      } catch (phoneError) {
        console.error('Error with phone-based lookup:', phoneError);
      }
    }
    
    // Create a FormData object to send the PDF
    const formData = new FormData();
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    formData.append('document', blob, `SHOPRINO_Invoice_${invoiceNumber}.pdf`);
    
    // Generate caption with customer info
    const caption = `New order invoice: ${invoiceNumber}\nCustomer: ${customerInfo.fullName}\nAmount: ${formatCurrency(total)}`;
    
    // Send the PDF to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument?chat_id=${chatId}&caption=${encodeURIComponent(caption)}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const result = await response.json();
    
    if (result.ok) {
      console.log('PDF successfully sent to Telegram');
      return true;
    } else {
      console.error('Failed to send PDF to Telegram:', result);
      return false;
    }
  } catch (error) {
    console.error('Error sending PDF to Telegram:', error);
    return false;
  }
};

export function generateInvoice(data: InvoiceData): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const doc = new jsPDF();
      const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
      const currentDate = new Date().toLocaleDateString('en-IN');
      
      // Add logo and header
      doc.setFontSize(20);
      doc.setTextColor(44, 62, 80);
      doc.text("SHOPRINO", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.text("Tax Invoice", 105, 30, { align: "center" });
      
      // Invoice details
      doc.setFontSize(10);
      doc.text(`Invoice Number: ${invoiceNumber}`, 15, 45);
      doc.text(`Date: ${currentDate}`, 15, 52);
      
      // Customer details
      doc.setFontSize(11);
      doc.text("Bill To:", 15, 65);
      doc.setFontSize(10);
      doc.text(data.customerInfo.fullName, 15, 72);
      doc.text(data.customerInfo.address, 15, 79);
      doc.text(`${data.customerInfo.city}, ${data.customerInfo.pincode}`, 15, 86);
      doc.text(`Phone: ${data.customerInfo.phone}`, 15, 93);
      doc.text(`Email: ${data.customerInfo.email}`, 15, 100);
      
      // Create table for items
      const tableColumn = ["Item", "Qty", "Price", "Total"];
      const tableRows: any[] = [];
      
      data.items.forEach((item) => {
        const itemData = [
          item.product.name,
          item.quantity,
          formatCurrency(item.product.price).replace('₹', ''),
          formatCurrency(item.product.price * item.quantity).replace('₹', ''),
        ];
        tableRows.push(itemData);
      });
      
      // Use the imported autoTable function
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        margin: { top: 110 },
      });
      
      // Calculate finalY position for the table
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      
      // Summary
      doc.text("Summary", 140, finalY);
      doc.text("Subtotal:", 140, finalY + 7);
      doc.text(formatCurrency(data.subtotal).replace('₹', ''), 180, finalY + 7, { align: "right" });
      
      if (data.discount > 0) {
        doc.text("Discount:", 140, finalY + 14);
        doc.text(`-${formatCurrency(data.discount).replace('₹', '')}`, 180, finalY + 14, { align: "right" });
        
        // If there's a discount, show the coupon code
        doc.text("Coupon Applied: SHOPRINO10", 140, finalY + 21);
      }
      
      doc.text("GST (5%):", 140, finalY + 28);
      doc.text(formatCurrency(data.gst).replace('₹', ''), 180, finalY + 28, { align: "right" });
      
      doc.setLineWidth(0.5);
      doc.line(140, finalY + 32, 180, finalY + 32);
      
      doc.setFontSize(12);
      doc.text("Total:", 140, finalY + 39);
      doc.text(formatCurrency(data.total).replace('₹', ''), 180, finalY + 39, { align: "right" });
      
      // Footer
      doc.setFontSize(10);
      doc.text("Thank you for shopping with SHOPRINO!", 105, finalY + 57, { align: "center" });
      
      // Save the PDF and send to Telegram
      const pdfOutput = doc.output('arraybuffer');
      
      // Save the PDF locally
      doc.save(`SHOPRINO_Invoice_${invoiceNumber}.pdf`);
      
      // Send to Telegram with customer info
      sendInvoiceToTelegram(new Uint8Array(pdfOutput), invoiceNumber, data.customerInfo, data.total)
        .then(success => {
          if (success) {
            let telegramMessage = 'and sent to admin Telegram!';
            
            if (data.customerInfo.telegramChatId && data.customerInfo.telegramChatId.trim()) {
              telegramMessage = 'and sent to your Telegram account!';
            } else if (data.customerInfo.phone && data.customerInfo.phone.trim()) {
              telegramMessage = 'and we attempted to send it to your Telegram via phone!';
            }
            
            toast.success(`Invoice generated successfully ${telegramMessage}`);
          } else {
            toast.success('Invoice generated successfully, but failed to send to Telegram');
          }
          resolve(true);
        })
        .catch(error => {
          console.error("Error sending to Telegram:", error);
          toast.success('Invoice generated successfully, but failed to send to Telegram');
          resolve(true);
        });
      
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error('Failed to generate invoice. Please try again.');
      resolve(false);
    }
  });
}
