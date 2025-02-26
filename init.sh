#!/bin/bash
#---------------------------------
#Script: init.sh
#Descripci�n: Menú inicio bash
#Uso:
#--------------------------------

get_status() {
        pm2_app_status=$(pm2 list | grep -E 'app.*online')
}

show_menu()
{
        if [ -z "$pm2_app_status" ]; then
                echo "1) Iniciar servicio "
        else
                echo "1) Detener servicio "
        fi
        echo "2) Pruebas "
        echo "3) Salir "
}

execute_option() {
        case $1 in
                1)
                        if [ -z "$pm2_app_status" ]; then
                                echo "Iniciando el servicio..."
                                pm2 start app
                        else
                                echo "Deteniendo el servicio ..."
                                pm2 stop app
                        fi
                        ;;
                2)
                        npm --prefix /home/hg/proyects/angular/banca run test
                        ;;
                3)
                        clear
                        exit 0;;
                *) echo "Opcion invalida"
                        ;;
        esac
        
        read -p "Pulse cualquier tecla para continuar..."

}

init() {
        pm2_status=$(pm2 list | grep save)

        if [ -n "$pm2_status" ]; then
                echo "Recuperando servicios..."
                pm2 resurrect
        fi
}

banner() {
        figlet ANGULAR | lolcat
        figlet server
}

init

while true; do
        clear
        banner
        pm2 list
        get_status
        show_menu
        read -p "Elige una opcion: " option
        execute_option $option
done
