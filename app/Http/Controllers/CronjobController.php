<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;

class CronjobController extends Controller
{
    function index()
    {

        $appId = config('services.onesignal.app_id');
        $restKey = config('services.onesignal.rest_api_key');

        if (! $appId || ! $restKey) {
            return redirect()->route('kirimnotifikasi')->with('error', 'OneSignal belum dikonfigurasi. Isi ONESIGNAL_APP_ID dan ONESIGNAL_REST_API_KEY di .env');
        }

        $payload = [
            'app_id' => $appId,
            'included_segments' => [config('services.onesignal.segment', 'Total Subscriptions')],
            'headings' => ['en' => 'PTSAN'],
            'contents' => ['en' => 'Sepertinya ada customer yang harus anda follow-up'],
        ];

        // if ($request->filled('url')) {
        //     $payload['url'] = $request->url;
        // }

        $response = Http::baseUrl('https://onesignal.com/api/v1')
            ->withHeaders(['Authorization' => 'Basic ' . $restKey])
            ->acceptJson()
            ->post('/notifications', $payload);

        if (! $response->successful() || ! $response->json('id')) {
            $detail = $response->json('errors.0', $response->body());

            return redirect()->route('kirimnotifikasi')->with('error', 'Gagal mengirim notifikasi: ' . $detail);
        }

        $recipients = $response->json('recipients', 0);

        return redirect()->route('kirimnotifikasi')->with('success', "Notifikasi berhasil dikirim ke {$recipients} perangkat");
    }
}
