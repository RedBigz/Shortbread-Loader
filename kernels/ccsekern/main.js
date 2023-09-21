if (Kernel === undefined) var Kernel = {};
if (typeof CCSE == "undefined")
	Game.LoadMod("https://klattmose.github.io/CookieClicker/CCSE.js");

function addMod(url) {
    Kernel.config[url] = 1;
    Game.LoadMod(url);
    SaveMods();
    Game.ClosePrompt();
}

let KernelIndex = "8b16bf7cCCSEKernelMods";

function SaveMods() {
    localStorage.setItem(KernelIndex, JSON.stringify(Kernel.config));
}

Kernel.launch = function () {
    Kernel.config = JSON.parse(localStorage.getItem(KernelIndex) ? localStorage.getItem(KernelIndex) : "{}");
    for (mod in Kernel.config) {
        Game.LoadMod(mod);
    }

	Game.customOptionsMenu.push(function () {
		function ModsContainer() {
			var list = "";
			for (mod in Kernel.config) {
				list += `
                <div style="border-bottom:1px dashed rgba(255,255,255,0.2);clear:both;overflow:hidden;padding:4px 0px;">
                    <div style="float:left;width:49%;text-align:left;overflow:hidden;">
                        <b>${mod}</b><br>
                    </div>
                    <div style="float:right;width:49%;text-align:right;overflow:hidden;">
                        <a class="option warning" style="padding:0px 2px;font-size:10px;margin:0px;vertical-align:top;" onclick="delete window.Kernel.config['${mod}'];SaveMods()">Delete</a>
                    </div>
                </div>
                `;
			}
			return list;
		}

		CCSE.AppendCollapsibleOptionsMenu(
			"Mods",
			`
            <a class="option" id="addmod">+ Add Mod</a><br>
            ${ModsContainer()}
            <small>You must restart Cookie Clicker after uninstalling mods for changes to apply.</small>
        `
		);

        document.getElementById("addmod").onclick = (() => {
            Game.Prompt("<h3>add mod</h3><input id=url class='framed' style='width:220px;border-image: url(img/frameBorder.png) 4 round;' placeholder='https://...'>", [["Add Mod", "window.addMod(document.getElementById('url').value)"]]);
        })
	});
};

if (!Kernel.isLoaded) {
	if (CCSE && CCSE.isLoaded) {
		Kernel.launch();
	} else {
		if (!CCSE) var CCSE = {};
		if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(Kernel.launch);
	}
}
