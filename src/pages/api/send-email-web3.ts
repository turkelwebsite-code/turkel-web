import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('🚀 WEB3FORMS: Request received');
    const formData = await request.formData();
    console.log('📋 Form data keys:', Array.from(formData.keys()));
    
    // Web3Forms API key (free service)
    formData.append('access_key', '8f123456-7890-1234-5678-901234567890'); // Placeholder - gerçek key gerekli
    
    // Email recipients
    formData.append('email', 'info@turkel.com.tr');
    formData.append('cc', 'sezan1991@gmail.com');
    
    // Form type için subject
    const formType = formData.get('form-type') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    
    let subject = '';
    if (formType === 'visitor') {
      subject = `🎯 Yeni Ziyaretçi Formu - ${firstName} ${lastName}`;
    } else if (formType === 'participant') {
      subject = `🎪 Yeni Katılımcı Formu - ${firstName} ${lastName}`;
    } else {
      subject = `📧 Yeni Form - ${firstName || 'Bilinmeyen'}`;
    }
    
    formData.append('subject', subject);
    
    console.log('📤 WEB3FORMS: Sending to Web3Forms API...');
    
    // Web3Forms'a gönder
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    
    console.log('📥 WEB3FORMS Response:', response.status, response.ok);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ WEB3FORMS Result:', result);
      
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Email başarıyla gönderildi',
        data: result
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error(`Web3Forms error: ${response.status}`);
    }

  } catch (error) {
    console.error('❌ WEB3FORMS ERROR:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Email gönderilemedi',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
