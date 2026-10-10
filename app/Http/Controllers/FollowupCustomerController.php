<?php

namespace App\Http\Controllers;

use App\Models\Ordercustomer;
use App\Services\FollowupService;
use Inertia\Inertia;

class FollowupCustomerController extends Controller
{
    public function index(FollowupService $followup)
    {
        $config = $followup->config();

        return Inertia::render('FollowupCustomer/Index', [
            'jmlOrder' => Ordercustomer::count(),
            'followups' => $followup->list($config['waktu']),
            'waktu' => $config['waktu'],
            'status' => $config['status'],
        ]);
    }
}
