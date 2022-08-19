odoo.define('bi_pos_reprint_reorder.OrderReprintScreen', function (require) {
	'use strict';

	const ReceiptScreen = require('point_of_sale.ReceiptScreen');
	const Registries = require('point_of_sale.Registries');

	const OrderReprintScreen = (ReceiptScreen) => {
		class OrderReprintScreen extends ReceiptScreen {
			constructor() {
				super(...arguments);
			}

			back() {
				this.trigger('close-temp-screen');
			}

			async handleAutoPrint() {
				if (this._shouldAutoPrint()) {
					const isPrinted = await this._printReceipt();
					if (isPrinted) {
						const { name, props } = this.nextScreen;
						this.showScreen(name, props);
					}
				}
			}

			orderDone() {
				const { name, props } = this.nextScreen;
				this.showScreen(name, props);
			}

			async printReceipt() {
				const isPrinted = await this._printReceipt();
				if (isPrinted) {
					const { name, props } = this.nextScreen;
					this.showScreen(name, props);
				}
			}
		}
		OrderReprintScreen.template = 'OrderReprintScreen';
		return OrderReprintScreen;
	};

	Registries.Component.addByExtending(OrderReprintScreen, ReceiptScreen);
	return OrderReprintScreen;
});
