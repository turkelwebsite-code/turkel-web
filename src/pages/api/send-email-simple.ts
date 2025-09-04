import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Form verilerini al
    const formType = formData.get('form-type') as string;
    const language = formData.get('language') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const companyName = formData.get('companyName') as string;
    const fair = formData.get('fair') as string;
    
    // Console'a log at - debug için
    console.log('📧 EMAIL API: Form data received:', {
      formType, language, firstName, lastName, email, phone, companyName, fair
    });
    
    // Basit response - email simulation
    // Gerçek email gönderimi için EmailJS client-side kullanacağız
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Form başarıyla alındı',
      data: {
        formType,
        firstName,
        lastName,
        email
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ EMAIL API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Server hatası',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
