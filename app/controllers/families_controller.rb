class FamiliesController < ApplicationController
    
    def new
        @family = Family.new
    end

    def index
        @family = Family.new
        @families = Family.all
    end

    def create
        @family = Family.new
        if @family.save
            flash[:notice] = 'family created'
            redirect_to families_path
        else
            flash[:notice] = 'something went wrong'
            redirect_to families_pathe
        end
    end

    def show
        set_family
    end
    
    def delete
        set_family
        if @family.destroy
            flash[:notice] = 'family deleted'
            redirect_to families_path
        else
            flash[:notice] = 'something went wrong'
            redirect_to families_path
        end
    end

    private 

    def family_params
        params.require(:family).permit(:familyname)
    end

    def set_family
        @family = Family.find(params[:id])
    end

end
