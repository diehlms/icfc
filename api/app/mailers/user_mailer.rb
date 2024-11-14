# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def registration_confirmation(user)
    @user = user
    mail(to: user.email, subject: 'Registration Confirmation')
  end

  def password_reset(user)
    @user = user
    mail(to: user.email, subject: 'Password Reset')
  end

  def verified_confirmation(user)
    @user = user
    mail(to: user.email, subject: 'ICFC Account Verified')
  end

  def new_member_notification(user)
    @user = user
    @admins = User.where(admin: true)
    emails = @admins.collect(&:email).join(',')
    mail(to: emails, subject: 'A new member is awaiting your approval.')
  end
end
