odoo.define('pos_orders_list.ReceiptScreen', function(require) {
	"use strict";

	const OrderReceipt = require('point_of_sale.OrderReceipt');
	const Registries = require('point_of_sale.Registries');
    const { Component } = owl;

	const ReceiptScreen = OrderReceipt => 
		class extends OrderReceipt {
			constructor() {
				super(...arguments);
				var reprint=this.props.reprint;
				if (reprint){
					$('.pos-logo').click();
				}
			}
			
			get receiptBarcode(){
				var order = this.props.order;
				order._printed = true;
				$('.brcd-print').barcode(
					order.barcode, // Value barcode (dependent on the type of barcode)
					"code128" // type (string)
				);
				return true
			}
		
	};

	Registries.Component.extend(OrderReceipt, ReceiptScreen);

	return OrderReceipt;
});