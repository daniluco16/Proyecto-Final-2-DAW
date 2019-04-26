<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\User;

use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function register(Request $request){

        //Recoger POST

        $json = $request->input('json', null);

        $params = json_decode($json);

        $name = (!is_null($json) && isset($params->name)) ? $params->name : null;
        $surname = (!is_null($json) && isset($params->surname)) ? $params->surname : null;
        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $nick = (!is_null($json) && isset($params->nick)) ? $params->nick : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $rol = 'Usuario';
        
        if(!is_null($name) && !is_null($surname) && !is_null($email) && !is_null($nick) && !is_null($password)){

            //Crear el usuario 

            $user = new User();
            $user->name = $name;
            $user->surname = $surname;
            $user->email = $email;
            $user->nick = $nick;
            $user->rol = $rol;


            $pwd = hash('sha256', $password);

            $user->password = $pwd;

            //Comprobar usuario duplicado

            $isset_user = User::where('email', '=', $email)->first();

            if(is_null($isset_user)){

                //Guardar usuario

                $user->save();

                $data = array(

                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario fue registrado correctamente :) !!'
                );


            }elseif(!is_null($isset_user)){

                //No guardar ya existe

                $data = array(

                    'status' => 'error',
                    'code' => 400,
                    'message' => 'El usuario no se ha podido registrar porque ya esta en uso :( !!'
                );

            }

        }else{

            $data = array(

                'status' => 'error',
                'code' => 400,
                'message' => 'El usuario no se ha podido registrar correctamente :( !!'
            );
        }

        return response()->json($data, 200);

    }

    public function login(Request $request){
 
        $jwtAuth = new JwtAuth();

        //Recibir datos por post

        $json = $request->input('json', null);

        $params = json_decode($json);

        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $getToken = (!is_null($json) && isset($params->getToken)) ? $params->getToken : null;


        //Cifrar la contraseña

        $pwd = hash('sha256', $password);

        if(!is_null($email) && !is_null($password) && ($getToken == null || $getToken == "false")){

            $signup = $jwtAuth->signup($email, $pwd);


        }elseif ($getToken != null) {

            // var_dump($getToken);die();

            $signup = $jwtAuth->signup($email, $pwd, $getToken);

        }else{

            $signup = array(

                'status' => 'error',
                'message' => 'Envia tus datos por POST'

            );



        }

        return response()->json($signup,200);


    }
}
