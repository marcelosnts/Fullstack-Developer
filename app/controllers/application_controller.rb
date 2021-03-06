class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    respond_to :html, :json

    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :authenticate_user!

    protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:full_name, :avatar_image, :admin, :email, :password, :password_confirmation) }
        devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:full_name, :avatar_image, :admin, :email, :password, :password_confirmation, :current_password) }
    end
end
