/** Email Notification Google Firebase Authentication function
 * 		Adding this function to your database 
 * 		 
 *  - Set 'auth' credentials configuration setting 'user' and 'password' properties:
 * 		"auth": {
 * 			"user": "example@gmail.com",
 * 			"password": "yoursecretpassword",
 * 		}
 *  - Set 'params' configuration setting 'header', 'from', 'to', 'acceptUri', 'revokeUri' and 'panelUri':
 * 		"params": {
 * 			"header": "https://example.com/logo.png",
 * 			"from": "emiter@gmail.com",
 * 			"to": "receiver@gmail.com",
 * 			"acceptUri": "https://example.com/admin/users/accept",
 * 			"revokeUri": "https://example.com/admin/users/revoke",
 * 			"panelUri": "https://example.com/admin/users/"
 * 		}
 * 
 * 
 * 	Tip: You can set this configurations via firebase-tools cli with command:
 * 		$> firebase functions:config:set configuration1.key1="value1"  configuration1.key2="value2" ...
 * 
 * 	More info here: https://firebase.google.com/docs/functions/config-env
 */

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const config = functions.config();
if ( 
	!Object.prototype.hasOwnProperty.call(config, "auth") || 
	!Object.prototype.hasOwnProperty.call(config, "auth")
) {
	console.log("'auth' and 'params' config are required. Checkout 'index.js' file...");
}

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.auth.user,
		pass: config.auth.password,
	}
});

function renderSignupTemplate(data) {
	return	`<table width="80%" border="0" cellspacing="5" style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
				<tr>
					<td align="center">
						<img width="40%" src="${ data.header }"/>
					</td>
				</tr>
				<tr>
					<td align="center">
						<h1>Hello Admin!</h1>
						<p>The user <b>'${ data.pending.name }'</b> (${ data.pending.email }) has requested access to WebLabs dashboard.</p>
					</td>
				</tr>
				<tr>
					<td align="center">
						<div>
							<a class="btn-accept" href="${ data.acceptUri }"
								style="	display: inline-block;
									margin: 10px 2%;
									padding: 10px 15px;
									color: white;
									background: #2ecc71;
									text-decoration: none;
									text-transform: none;
									border-radius: 5px;		
								">
								Accept
							</a>
							<a class="btn-cancel" href="${ data.revokeUri }"
								style="	display: inline-block;
									margin: 10px 2%;
									padding: 10px 15px;
									color: white;
									background: #e74c3c;
									text-decoration: none;
									text-transform: none;
									border-radius: 5px;		
								">
								Revoke
							</a>
						</div>
					</td>
				</tr>
				<tr>
					<td align="center">
						<a href="${ data.panelUri }"
							style="	color: #666;
									text-decoration: underline;
									text-transform: none;		
							">
							Go to dasboard
						</a>
					</td>
				</tr>
			</table>`;
}

function renderConfirmedTemplate(data) {
	return	`<table width="80%" border="0" cellspacing="5" style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
				<tr>
					<td align="center">
						<img width="40%" src="${ data.header }"/>
					</td>
				</tr>
				<tr>
					<td align="center">
						<h1>Hello ${ data.name }!</h1>
						<p>Congratulations! Now you have permission to edit WebLabs and remember, <b>with great power. comes great responsibility</b>.</p>
					</td>
				</tr>
				<tr>
					<td align="center">
						<a class="btn-accept" href="${ data.panelUri }"
							style="	display: inline-block;
								margin: 10px 2%;
								padding: 10px 15px;
								color: white;
								background: #2ecc71;
								text-decoration: none;
								text-transform: none;
								border-radius: 5px;		
							">
							Go to dasboard
						</a>
					</td>
				</tr>
			</table>`;
}

// emailSingUpNotifications listents to new user requests and notify via email to admin address.
exports.emailSignUpNotification = functions.database.ref("/users/pending/{pushId}")
	.onCreate((snap, ctx) => {
		const pending = snap.val();

		const data = {
			header: config.params.header,
			pending: {
				name: pending.name,
				email: pending.email,
			},
			acceptUri: `${ config.params.acceptUri }/${ ctx.params.pushId }`,
			revokeUri: `${ config.params.revokeUri }/${ ctx.params.pushId }`,
			panelUri: config.params.panelUri
		}

		const options = {
			from: config.params.from,
			to: config.params.to,
			subject: "[WebLabs Dasboard] Access requested to WebLabs",
			html: renderSignupTemplate(data)
		}

		return new Promise((resolve, reject) => {
			transporter.sendMail(options, (err, info) => {
				if (err) reject(err);
				else resolve(info);
			});
		});
	});

// emailSignedNotifications listents confirmations and notify via email to new user address.
exports.emailConfirmedNotification = functions.database.ref("/users/members/{pushId}")
.onCreate((snap, ctx) => {
	const confirmed = snap.val();

	const data = {
		header: config.params.header,
		name: confirmed.name,
		panelUri: config.params.panelUri
	}

	const options = {
		from: config.params.from,
		to: confirmed.email,
		subject: "[WebLabs Dasboard] Access requested confirmed to WebLabs",
		html: renderConfirmedTemplate(data)
	}

	return new Promise((resolve, reject) => {
		transporter.sendMail(options, (err, info) => {
			if (err) reject(err);
			else resolve(info);
		});
	});
});
