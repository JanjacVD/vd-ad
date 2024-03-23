<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('geolocation_addresses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name")->nullable();
            $table->string("place_id");
            $table->string("formatted_address");
            $table->integer("lat");
            $table->integer("lng");
            $table->unsignedBigInteger("user_id")->nullable();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('geolocation_addresses');
    }
};
