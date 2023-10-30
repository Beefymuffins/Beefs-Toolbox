import figlet from "figlet";
import gradient from "gradient-string";


const greet = async () => {

	// Displaying CLI
	figlet('Proxy-List-Checker', function (err, data) {
		console.log(gradient.pastel.multiline(data));
	});

	// Wait for 2secs
	await new Promise(resolve => setTimeout(resolve, 2000));
}

export default greet;
