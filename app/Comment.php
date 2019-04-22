<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';

    //Relaciones

    public function user(){

        return $this->belongsTo('App\User', 'User_id');
       
    }

    public function film(){

        return $this->belongsTo('App\Film', 'Film_id');


    }

}
