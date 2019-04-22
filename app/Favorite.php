<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table = 'favorites';

    //Relaciones 

    public function user(){

        return $this->belongsTo('App\User', 'User_id');

    }

    public function film(){

      
        return $this->belongsTo('App\Film', 'Film_id');
        

    }

}
