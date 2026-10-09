<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Ordercustomer;
use Inertia\Inertia;

class FollowupCustomerController extends Controller
{
    public function index()
    {
        $jmlCustomer = Customer::count();
        $jmlOrder = Ordercustomer::count();
        $followups = [];

        return Inertia::render('FollowupCustomer/Index', compact('jmlCustomer', 'jmlOrder', 'followups'));
    }
}
