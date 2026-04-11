import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, type } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Log the contact message (in production, send to email service)
    console.log('Contact Form Submission:', {
      name,
      email,
      subject,
      message,
      type: type || 'general',
      timestamp: new Date().toISOString()
    })

    // In production, you would:
    // 1. Send an email to support@elspace.com
    // 2. Save to database
    // 3. Send confirmation email to user

    // For now, just acknowledge receipt
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon.',
        reference: `CONTACT_${Date.now()}`
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
