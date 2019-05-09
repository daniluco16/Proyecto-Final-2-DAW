<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;




class UserController extends Controller
{
    public function register(Request $request){

        //Recoger POST

        $json = $request->input('json', null);

        $params = json_decode($json);

        $validacion = json_decode($json, true);

        $validate = \Validator::make($validacion, [

            'name' => 'required|min:3',
            'surname' => 'required|min:3',
            'email' => 'required|min:5|unique:users',
            'nick' => 'required|min:3|unique:users',
            'password' => 'required|min:6'
        ]);

        if($validate->fails()){

            $data = ($validate->errors());

            return response()->json($data, 400);

        }


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

    public function store(Request $request){

        //Recoger POST

        $json = $request->input('json', null);

        $params = json_decode($json);

        $validacion = json_decode($json, true);

        $validate = \Validator::make($validacion, [

            'name' => 'required|min:3',
            'surname' => 'required|min:3',
            'email' => 'required|min:5|unique:users',
            'nick' => 'required|min:3|unique:users',
            'password' => 'required|min:6'
        ]);

        if($validate->fails()){

            $data = ($validate->errors());

            return response()->json($data, 400);

        }


        $name = (!is_null($json) && isset($params->name)) ? $params->name : null;
        $surname = (!is_null($json) && isset($params->surname)) ? $params->surname : null;
        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $nick = (!is_null($json) && isset($params->nick)) ? $params->nick : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $image = $params->image;

        if(!is_null($name) && !is_null($surname) && !is_null($email) && !is_null($nick) && !is_null($password)){

            if(!is_null($image)){

                if(strpos($image, 'data:image/png;base64') !== false){

                    $image = str_replace('data:image/png;base64,','',$image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = str_random(10).'.'.'png';
                    \File::put(public_path(). '/avatar/' . $imageName, base64_decode($image));

                }
                if(strpos($image, 'data:image/jpeg;base64') !== false)
                    {
                        $image = str_replace('data:image/jpeg;base64,', '', $image);
                        $image = str_replace(' ', '+', $image);
                        $imageName = str_random(10).'.'.'jpg';
                        \File::put(public_path(). '/avatar/' . $imageName, base64_decode($image));
                    }

            }

            //Crear el usuario 

            $user = new User();
            $user->name = $name;
            $user->surname = $surname;
            $user->email = $email;
            $user->nick = $nick;
            $user->rol = 'Usuario';
            
            if(isset($imageName)){

                $user->image = $imageName;

            }


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
    public function index(Request $request){

        $user = User::all();

        return response()->json(array(

            'user' => $user,
            'status' => 'success'

        ),200);

    }

    public function show($id){

        $user = User::find($id);

        return response()->json(array(

            'user' => $user,
            'status' => 'success'

        ),200);
    }

    public function changeRol($id, Request $request){

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){

            $user = User::find($id);

            $user->rol = $user->rol == 'Admin' ? 'Usuario' : 'Admin';

            $user->save();

            $data = array(

                'rol' => $user->rol,
                'status' => 'success',
                'code' => 200

            );

        }else{

            $data = array(

                'rol' => $user->rol,
                'status' => 'error',
                'code' => 300

            );

        }

        return response()->json($data, 200);

    }

    public function update($id, Request $request){

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){

            //Recoger parametros post

            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);

            //Validar datos

            $validate = \Validator::make($params_array, [

                'name' => 'required|min:3',
                'surname' => 'required|min:3',
                'email' => 'required|min:5|unique:users,email,'. $id,
                'nick' => 'required|min:3|unique:users,nick,'. $id,
                'password' => 'required|min:6'
            ]);

            if($validate->fails()){
    
                return response()->json($validate->errors(), 400);
    
            }

            if(!isset($params_array['password']))
            {
                unset($params_array['password']);
            }
            else
            {
                $pwd = hash('sha256', $params_array['password']);
                $params_array['password'] = $pwd;
            }

            //Actualizar user
           
            unset($params_array['id']);
            unset($params_array['created_at']);
            unset($params_array['rol']);
            
            
            

            $user = User::where('id', $id)->update($params_array);

            $data = array(

                'user' => $params,
                'status' => 'success',
                'code' => 200

            );

        }else{

            $data = array(

                'message' => 'Actualización incorrecta',
                'status' => 'error',
                'code' => 300, 

            );

        }

        return response()->json($data, 200);

    }

    public function destroy($id, Request $request){

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){

            //Comprobar si existe registro

            $user = User::find($id);

            //Borrarlo

            $user->delete();

            //Devolverlo

            $data = array(

                'user' => $user,
                'status' => 'success',
                'code' => 200

            );

        }else{

            $data = array(

                'status' => 'error',
                'code' => 400,
                'message' => 'Login incorrecto!!'

            );
        }

        return response()->json($data, 200);


    }


}
