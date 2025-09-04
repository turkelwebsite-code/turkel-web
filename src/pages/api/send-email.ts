import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('🚀 GMAIL SMTP API: Request received');
    const formData = await request.formData();
    console.log('📋 Form data keys:', Array.from(formData.keys()));
    
    // Form verileri
    const formType = formData.get('form-type') as string;
    const language = formData.get('language') as string;
    
    // Ziyaretçi/Katılımcı form verileri
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const companyName = formData.get('companyName') as string;
    const fair = formData.get('fair') as string;
    
    // İletişim form verileri
    const fullName = formData.get('fullName') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    console.log('📧 GMAIL SMTP: Creating transporter...');
    
    // Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'turkelwebsite@gmail.com',
        pass: 'bjrw glnk zvpc ltma' // Google App Password
      }
    });
    
    console.log('✅ GMAIL SMTP: Transporter created');

    // Email başlığı
    let emailSubject = '';
    if (formType === 'visitor') {
      emailSubject = `🎯 Yeni Ziyaretçi Formu - ${firstName} ${lastName}`;
    } else if (formType === 'participant') {
      emailSubject = `🎪 Yeni Katılımcı Formu - ${firstName} ${lastName}`;
    } else if (formType === 'contact') {
      emailSubject = `📧 Yeni İletişim Formu - ${fullName}`;
    } else {
      emailSubject = `📝 Yeni Form Gönderimi`;
    }

    // HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${emailSubject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="background: #CE1A28; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">${emailSubject}</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Turkel Fuarcılık - Website Form</p>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
          
          ${formType === 'contact' ? `
          <!-- İletişim Form -->
          <h3 style="color: #CE1A28; margin-top: 0;">👤 İletişim Bilgileri</h3>
          <p><strong>Ad Soyad:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Konu:</strong> ${subject}</p>
          
          ${message ? `
          <h3 style="color: #CE1A28;">💬 Mesaj</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          ` : ''}
          
          ` : `
          <!-- Ziyaretçi/Katılımcı Form -->
          <h3 style="color: #CE1A28; margin-top: 0;">👤 Kişisel Bilgiler</h3>
          <p><strong>Ad Soyad:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Şirket:</strong> ${companyName}</p>
          
          <h3 style="color: #CE1A28;">🎪 Fuar Bilgileri</h3>
          <p><strong>İlgilenilen Fuar:</strong> ${fair}</p>
          <p><strong>Form Tipi:</strong> <span style="background: ${formType === 'visitor' ? '#28a745' : '#17a2b8'}; color: white; padding: 3px 8px; border-radius: 3px;">${formType === 'visitor' ? 'ZİYARETÇİ' : 'KATILIMCI'}</span></p>
          `}
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="margin: 0; color: #666; font-size: 14px;">
            📅 <strong>Gönderim:</strong> ${new Date().toLocaleString('tr-TR')}<br>
            🌐 <strong>Dil:</strong> ${language === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}<br>
            💻 <strong>Kaynak:</strong> Turkel Website
          </p>
          
        </div>
        
      </body>
      </html>
    `;

    console.log('📤 GMAIL SMTP: Sending email...');
    console.log('📧 Email details:', {
      from: 'turkelwebsite@gmail.com',
      to: 'info@turkel.com.tr',
      cc: 'sezan1991@gmail.com',
      subject: emailSubject
    });
    
    // Email gönder
    const emailResult = await transporter.sendMail({
      from: 'turkelwebsite@gmail.com',
      to: 'info@turkel.com.tr',
      cc: 'sezan1991@gmail.com',
      subject: emailSubject,
      html: htmlContent
    });
    
    console.log('✅ GMAIL SMTP: Email sent successfully!', emailResult.messageId);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ GMAIL SMTP ERROR:', error);
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      error: 'Gmail SMTP hatası',
      details: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
