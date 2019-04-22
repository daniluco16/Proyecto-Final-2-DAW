<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $table = 'films';

    //RELACIONES

    public function comments(){

        return $this->hasMany('App\Comment');

    }
    public function favorites(){

        return $this->hasMany('App\Favorite');

    }


}
