class UsersController < ApplicationController
    def update
        user = User.find(params[:id])
        user.update(user_params)

        render json: user, status: 200
    end

    def user_params
        params.require(:user).permit(:full_name, :email, :avatar_image, :admin, :password, :password_confirmation)
    end
end
