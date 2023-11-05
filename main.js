var defaultKernels = [
    {
        name: "CCSE",
        author: "klattmose",
        version: "2.035+kernel",
        date: "TBA",
        id: "io.github.klattmose.CCSE",
        saveId: "8b16bf7c", // CRC32
        available: true,
        res: {
            main: "https://redbigz.github.io/Shortbread-Loader/kernels/ccsekern/main.js"
        }
    },
    {
        name: "Steam Workshop",
        author: "RedBigz",
        version: "v1.0",
        date: "TBA",
        id: "io.redbigz.wskern",
        saveId: "webshop-407a3d2c",
        available: true,
        res: {
            main: "https://redbigz.github.io/Shortbread-Loader/kernels/wskern/main.js"
        }
    },
    {
        name: "Macadamia",
        author: "RedBigz",
        version: "0.0.1proto",
        date: "TBA",
        id: "io.redbigz.Macadamia",
        saveId: "11067f61",
        available: false,
        res: {
            main: null
        }
    },
];


window.sbm_loadKernel = (num) => {
    var kern = defaultKernels[num];
	Game.ClosePrompt();
	PlaySound('snd/tick.mp3');
    Game.SaveTo = kern.saveId;
    if (localStorage.getItem(Game.SaveTo)) { } else {
        Game.HardReset(2);
        Game.cookies = 0;
        Game.WriteSave();
    }

    Game.LoadSave();

    if (kern.res.main) {
        Game.LoadMod(kern.res.main, null, (err) => {Game.Prompt(`An error occured while loading ${kern.res.main}.<br><small>${JSON.stringify(err)}</small>`, [["Reload Page", "location=location"]])});
    }
}

function sbm_kernelSelect() {

	function kernelContainer(kern, num) {
		var oc = kern.available ? `window.sbm_loadKernel(${num})` : "";
		var wa = kern.available ? "" : " warning";

		return `
		<div style="border-bottom:1px dashed rgba(255,255,255,0.2);clear:both;overflow:hidden;padding:4px 0px;">
			<div style="float:left;width:49%;text-align:left;overflow:hidden;">
				<b>${kern.name}</b><br>
				${kern.author}<br>
				<small>${kern.version} | ${kern.date}</small>
			</div>
			<div style="float:right;width:49%;text-align:right;overflow:hidden;">
				${kern.saveId}
				<a class="option${wa}" style="padding:0px 2px;font-size:10px;margin:0px;vertical-align:top;" onclick="${oc}">Load</a>
			</div>
		</div>
		`;
	}

	var kerns = "";
	for (num in defaultKernels) {
		kerns += kernelContainer(defaultKernels[num], num);
	}

	Game.Prompt(
		`
		<h3>shortbread</h3><br>
        <small>by redbigz</small><br>
		${kerns}
		<small style="font-style:italic;">each kernel uses a different save file. your main game is never touched, other than the shortbread exploit's residence in your save.</small>
		`,
		[]
	);

	//	<a class='option'>Macadamia (unavailable)</a><br>
	//	<a class='option' id='kernel-ccse'>CCSE (compatibility)</a><br></br>

	// document.getElementById("kernel-ccse").onclick = () => {

	// };
}
sbm_kernelSelect();