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

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){

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

        $user_id = $params->User_id;
        $film_id = $params->Film_id;


        $contenido = (!is_null($json) && isset($params->contenido)) ? $params->contenido : null;


        if(!is_null($contenido)){

            $comment = new Comment();

            $comment->User_id = $user_id;
            $comment->Film_id = $film_id;
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

    public function listarComentarios(Request $request, $id){

        $listcomment = Comment::where('Film_id', $id)->get()->load('User');      

        return response()->json($listcomment);

        // return response()->json(array(

        //     'comment' => $comment,
        //     'status' => 'success'

        // ),200);


    }

    public function deleteComment($id, Request $request){

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){

            $comment = Comment::find($id);

            $comment->delete();

            $data = array(

                'user' => $comment,
                'status' => 'success',
                'code' => 200
            );

        }else{

            $data = array(

                'status' => 'error',
                'code' => 400,
                'message' => "No se pudo eliminar un comentario"

            );
        }

        return response()->json($data, 200);

    }
}
