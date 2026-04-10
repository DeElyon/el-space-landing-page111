import nodemailer from 'nodemailer';
import * as templates from './email-templates';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function replacePlaceholders(content: string, data: Record<string, any>) {
  let result = content;
  
  // Handle logoUrl
  const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`;
  result = result.replace(/{{logoUrl}}/g, logoUrl);

  for (const key in data) {
    const value = data[key];
    if (Array.isArray(value)) {
      // Simple array handling
      const regex = new RegExp(`{{#each ${key}}}([\\s\\S]*?){{/each}}`, 'g');
      result = result.replace(regex, (_, innerContent) => {
        return value.map((item, index) => {
          let replacedInner = innerContent.replace(/{{this}}/g, item);
          if (typeof item === 'object') {
            for (const subKey in item) {
              replacedInner = replacedInner.replace(new RegExp(`{{${subKey}}}`, 'g'), item[subKey]);
            }
          }
          replacedInner = replacedInner.replace(/{{@index}}/g, (index + 1).toString());
          return replacedInner;
        }).join('');
      });
    } else if (typeof value === 'boolean') {
        const ifRegex = new RegExp(`{{#if ${key}}}([\\s\\S]*?){{/if}}`, 'g');
        result = result.replace(ifRegex, (_, innerContent) => {
            return value ? innerContent : '';
        });
    } else {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
  }
  
  // Clean up remaining handlebars tags
  result = result.replace(/{{#if [\s\S]*?}}([\s\S]*?){{\/if}}/g, '');
  
  return result;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  try {
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'hello@elspace.tech',
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendOTPEmail(email: string, otp: string, userName?: string) {
  const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`;
  return sendEmail({
    to: email,
    subject: `Your EL SPACE OTP: ${otp}`,
    html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>EL SPACE - OTP Verification</title>
          </head>
          <body style="font-family: Inter, sans-serif; background-color: #f3f4f6; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 40px;">
              <div style="text-align: center; margin-bottom: 30px;">
                 <img src="${logoUrl}" alt="EL SPACE" style="height: 48px; margin-bottom: 16px;">
                <p style="color: #6B7280; margin: 5px 0; font-size: 14px;">Freelance Without the Friction</p>
              </div>
              
              <h2 style="color: #1F2937; margin-bottom: 20px;">Welcome${userName ? `, ${userName}` : ''}!</h2>
              
              <p style="color: #4B5563; line-height: 1.6; margin-bottom: 20px;">
                Your one-time password (OTP) to access your EL SPACE account is:
              </p>
              
              <div style="background-color: #f9fafb; border: 2px solid #06B6D4; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                <p style="font-size: 32px; font-weight: bold; color: #06B6D4; letter-spacing: 4px; margin: 0;">
                  ${otp}
                </p>
              </div>
              
              <p style="color: #6B7280; font-size: 14px; margin: 20px 0;">
                This code will expire in 15 minutes. If you didn't request this code, please ignore this email.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <div style="text-align: center; color: #9CA3AF; font-size: 12px;">
                <p style="margin: 5px 0;">
                  © 2026 EL VERSE TECHNOLOGIES. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
  });
}

export async function sendClientWelcomeEmail(email: string, data: {
  clientName: string;
  jobTitle: string;
  dashboardUrl: string;
  slackInviteUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  privacyUrl?: string;
  unsubscribeUrl?: string;
}) {
  const html = replacePlaceholders(templates.CLIENT_WELCOME_HTML, {
    ...data,
    linkedinUrl: data.linkedinUrl || '#',
    twitterUrl: data.twitterUrl || '#',
    privacyUrl: data.privacyUrl || '#',
    unsubscribeUrl: data.unsubscribeUrl || '#',
  });
  return sendEmail({ to: email, subject: 'Welcome to EL SPACE', html });
}

export async function sendFreelancerWelcomeEmail(email: string, data: {
  freelancerName: string;
  skills?: string[];
  elitesUrl: string;
  profileUrl: string;
  slackInviteUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  privacyUrl?: string;
  unsubscribeUrl?: string;
}) {
  const html = replacePlaceholders(templates.FREELANCER_WELCOME_HTML, {
    ...data,
    skills: data.skills || [],
    linkedinUrl: data.linkedinUrl || '#',
    twitterUrl: data.twitterUrl || '#',
    privacyUrl: data.privacyUrl || '#',
    unsubscribeUrl: data.unsubscribeUrl || '#',
  });
  return sendEmail({ to: email, subject: 'Welcome to EL SPACE - You\'re In!', html });
}

export async function sendClientMatchNotification(email: string, data: {
  clientName: string;
  matchCount: number;
  projectTitle: string;
  matches: Array<{
    name: string;
    title: string;
    verificationLevel: string;
    rating: number;
    completedProjects: number;
    hourlyRate: number;
    skillsList: string;
    availability: string;
    profileUrl: string;
  }>;
  dashboardUrl: string;
  compareUrl: string;
  supportUrl: string;
  calendarUrl: string;
  notificationSettingsUrl: string;
}) {
  const text = replacePlaceholders(templates.CLIENT_MATCHES_TEXT, data);
  return sendEmail({ to: email, subject: `🎯 Your EL SPACE Matches Are Ready – ${data.matchCount} Vetted Freelancers for "${data.projectTitle}"`, text });
}

export async function sendFreelancerMatchNotification(email: string, data: {
  freelancerName: string;
  projectTitle: string;
  budgetMin: number;
  budgetMax: number;
  timeline: string;
  clientCompany: string;
  clientIndustry: string;
  projectDescription: string;
  skillsRequired: string;
  availabilityUrl: string;
  portfolioUrl: string;
  profileViews: number;
  matchRate: number;
  completedProjects: number;
  dashboardUrl: string;
  pauseMatchingUrl: string;
}) {
  const text = replacePlaceholders(templates.FREELANCER_MATCH_TEXT, data);
  return sendEmail({ to: email, subject: `🎯 New Match – Client Interested in Your Profile for "${data.projectTitle}"`, text });
}

export async function sendMilestoneFundedEmail(to: string, type: 'client' | 'freelancer', data: any) {
  const template = type === 'client' ? templates.CLIENT_MILESTONE_FUNDED_TEXT : templates.FREELANCER_MILESTONE_FUNDED_TEXT;
  const subject = type === 'client' 
    ? `✅ Milestone 1 Funded – "${data.projectTitle}" is Ready to Begin`
    : `💰 Milestone 1 Funded – Start Working on "${data.projectTitle}"`;
  
  const text = replacePlaceholders(template, data);
  return sendEmail({ to, subject, text });
}

export async function sendStandupReminder(email: string, data: {
  freelancerName: string;
  projectTitle: string;
  clientName: string;
  projectSlug: string;
  slackChannelUrl: string;
  dashboardStandupUrl: string;
}) {
  const text = replacePlaceholders(templates.DAILY_STANDUP_REMINDER_TEXT, data);
  return sendEmail({ to: email, subject: `⏰ Daily Standup Reminder – "${data.projectTitle}"`, text });
}

// Duplicate removed - see sendPaymentReceivedEmail in NEW COMPREHENSIVE NOTIFICATION EMAILS section

export async function sendProjectCompletionEmail(to: string, type: 'client' | 'freelancer', data: any) {
  const template = type === 'client' ? templates.CLIENT_PROJECT_COMPLETE_TEXT : templates.FREELANCER_PROJECT_COMPLETE_TEXT;
  const subject = type === 'client'
    ? `🎉 Project Complete – "${data.projectTitle}" + Leave a Review`
    : `🎉 Project Complete – "${data.projectTitle}" + Leave a Review for ${data.clientName}`;
  
  const text = replacePlaceholders(template, data);
  return sendEmail({ to, subject, text });
}

// ============ NEW COMPREHENSIVE NOTIFICATION EMAILS ============

export async function sendPostMatchEmail(to: string, type: 'client' | 'freelancer', data: any) {
  const template = type === 'client' ? templates.POST_MATCH_CLIENT : templates.POST_MATCH_FREELANCER;
  const subject = type === 'client'
    ? `🎯 Your EL SPACE Matches Are Ready – 3-5 Vetted Freelancers for "${data.projectTitle}"`
    : `🎯 New Match – Client Interested in Your Profile for "${data.projectTitle}"`;
  
  const text = replacePlaceholders(template, data);
  return sendEmail({ to, subject, text });
}

export async function sendMilestoneFoundedEmail(to: string, type: 'client' | 'freelancer', data: any) {
  const template = type === 'client' ? templates.MILESTONE_FUNDED_CLIENT : templates.MILESTONE_FUNDED_FREELANCER;
  const subject = type === 'client'
    ? `✅ Milestone 1 Funded – "${data.projectTitle}" is Ready to Begin`
    : `💰 Milestone 1 Funded – Start Working on "${data.projectTitle}"`;
  
  const text = replacePlaceholders(template, data);
  return sendEmail({ to, subject, text });
}

export async function sendDailyStandupReminderEmail(to: string, data: any) {
  const template = templates.DAILY_STANDUP_REMINDER;
  const subject = `⏰ Daily Standup Reminder – "${data.projectTitle}"`;
  
  const text = replacePlaceholders(template, data);
  return sendEmail({ to, subject, text });
}

export async function sendPaymentReceivedEmail(to: string, data: any) {
  const template = templates.PAYMENT_RECEIVED_FREELANCER;
  const subject = `💵 Payment Received – $${data.amount} for "${data.projectTitle}" Milestone ${data.milestoneNumber}`;
  
  const text = replacePlaceholders(template, data);
  return sendEmail({ to, subject, text });
}

export async function sendProjectCompleteWithReviewEmail(to: string, type: 'client' | 'freelancer', data: any) {
  const template = type === 'client' ? templates.PROJECT_COMPLETE_CLIENT : templates.PROJECT_COMPLETE_FREELANCER;
  const subject = type === 'client'
    ? `🎉 Project Complete – "${data.projectTitle}" + Leave a Review`
    : `🎉 Project Complete – "${data.projectTitle}" + Leave a Review for ${data.clientName}`;
  
  const text = replacePlaceholders(template, data);
  return sendEmail({ to, subject, text });
}

export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email connection verified');
    return true;
  } catch (error) {
    console.error('Email connection failed:', error);
    return false;
  }
}
