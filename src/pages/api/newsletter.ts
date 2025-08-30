import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const locale = formData.get('locale') as string;
    
    // Basic email validation
    if (!email || !/.+@.+\..+/.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email address' 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Here you would typically integrate with your email service provider
    // For example: Mailchimp, ConvertKit, SendGrid, etc.
    
    // For now, we'll just log the subscription
    console.log(`Newsletter subscription: ${email} (${locale})`);
    
    // In a real implementation, you would:
    // 1. Add the email to your mailing list
    // 2. Send a confirmation email
    // 3. Handle any errors from the email service
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
