<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Favorite;
use App\User;
use GuzzleHttp\Client;

use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    public function addFavorito(Request $request){

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();

        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){

            $json = $request->input('json', null);

            $params = json_decode($json);

            $film_id = $params->Film_id;
            $user_id = $params->User_id;

            $favorito = new Favorite();

            $favorito->Film_id = $film_id;
            $favorito->User_id = $user_id;

            $favorito->save();

            $data = array(

                'status' => 'success',
                'code' => 200,
                'message' => 'Se agrego su película a favoritos'
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

    public function listarFavorito($id, Request $request){

        $listFavorito = Favorite::where('User_id', $id)->get();    
        
        return response()->json($listFavorito);
    }
    
    public function deleteFavorito(Request $request, $Film_id){

            $hash = $request->header('Authorization', null);

            $jwtAuth = new JwtAuth();
            $checkToken = $jwtAuth->checkToken($hash);

            if($checkToken){

                $favorito = Favorite::where('Film_id', $Film_id)->delete();


                $data = array(

                    'Film_id' => $Film_id,
                    'status' => 'success',
                    'code' => 200
                );

            }else{

                $data = array(

                    'status' => 'error',
                    'code' => 400,
                    'message' => "No se pudo eliminar de favorito"
    
                );

            }

            

        return response()->json($data, 200);        
    }

}
