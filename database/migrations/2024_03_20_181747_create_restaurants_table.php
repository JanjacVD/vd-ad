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
            $table->boolean("is_accepting_orders")->default(0);
            $table->boolean("is_working")->default(0);
            $table->boolean("is_banned")->default(0);
            $table->boolean("is_confirmed")->default(0);
            $table->string("tel_number");
            $table->json("worktime");
            $table->unsignedBigInteger("geolocation_address_id")->nullable();
            $table->foreign('geolocation_address_id')->references('id')->on('geolocation_addresses');
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
