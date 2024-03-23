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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->boolean("is_accepting_orders");
            $table->boolean("is_working");
            $table->boolean("is_banned");
            $table->boolean("is_confirmed");
            $table->string("tel_number");
            $table->unsignedBigInteger("geolocation_address_id")->nullable();
            $table->foreign('geolocation_address_id')->references('id')->on('geolocation_addresses');
            $table->json("work_time");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
