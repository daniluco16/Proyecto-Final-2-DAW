<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;

use App\Comment;
use App\User;
use Illuminate\Support\Facades\DB;


class CommentController extends Controller
{
    public function crearComentario(Request $request){

        $json = $request->input('json', null);

        $params = json_decode($json);

        $validacion = json_decode($json, true);

        $validate = \Validator::make($validacion, [

            'contenido' => 'required|min:3',
        ]);

        if($validate->fails()){

            $data = ($validate->errors());

            return response()->json($data, 400);

        }

        $contenido = (!is_null($json) && isset($params->contenido)) ? $params->contenido : null;
        // $creador = (!is_null($json) && isset($params->creador)) ? $params->creador : null;


        if(!is_null($contenido)){

            $comment = new Comment();

            $comment->contenido = $contenido;

            $comment->save();

            $data = array(

                'status' => 'success',
                'code' => 200,
                'message' => 'Se completo su comentario'
            );


        }else{

            $data = array(

                'status' => 'error',
                'code' => 400,
                'message' => 'Asegurese que todo esta correctamente'
            );


        }

        return response()->json($data, 200);
    }
}
