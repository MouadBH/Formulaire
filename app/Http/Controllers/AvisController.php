<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Avis;

class AvisController extends Controller
{
    public function add(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'rate' => 'required|not_in:0|numeric',
            'avis' => 'required|min:10|max:10000',
            'title' => 'required|max:25',
            'numCommande' => 'numeric',
            'isPublic' => 'required',
            'selectedDate' => 'date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson());
        }

        $avis = new Avis();
        $avis->title = $request->json()->get('title');
        $avis->rate = $request->json()->get('rate');
        $avis->avis = $request->json()->get('avis');
        $avis->commande = $request->json()->get('numCommande');
        $avis->isPublic = $request->json()->get('isPublic');
        $avis->date = $request->json()->get('selectedDate');
        $avis->save();

        return response()->json(['success' => true], 201);
    }
}
