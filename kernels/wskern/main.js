let appid = 1454400;

/*

{
    "response": {
        "result": 1,
        "resultcount": 1,
        "publishedfiledetails": [
            {
                "publishedfileid": "2693901672",
                "result": 1,
                "creator": "76561198111064085",
                "creator_app_id": 1454400,
                "consumer_app_id": 1454400,
                "filename": "FortuneHelper_76561198111064085.zip",
                "file_size": 3571,
                "file_url": "https://steamusercontent-a.akamaihd.net/ugc/2013717536249548650/4AC7C24FA819A8465448B04C7C16D4273F3CC6B3/",
                "hcontent_file": "2013717536249548650",
                "preview_url": "https://steamuserimages-a.akamaihd.net/ugc/1840282110006081615/55B18700BE0F57141EB3EE737F21B789FDAFB3F2/",
                "hcontent_preview": "1840282110006081615",
                "title": "FortuneHelper",
                "description": "",
                "time_created": 1640456105,
                "time_updated": 1685462460,
                "visibility": 0,
                "banned": 0,
                "ban_reason": "",
                "subscriptions": 49093,
                "favorited": 923,
                "lifetime_subscriptions": 57387,
                "lifetime_favorited": 1015,
                "views": 87920,
                "tags": []
            }
        ]
    }
}

*/

window.SHORTBREAD_SAVEID = window.SHORTBREAD_SAVEID
	? window.SHORTBREAD_SAVEID
	: "ws";

window.Kernel = {};

function addMod(url) {
	if (!parseInt(url)) return;
	if (!url) return;
	Kernel.config[url] = 1;
	loadWorkshopMod(url);
	SaveMods();
	Game.ClosePrompt();
}

let KernelIndex = window.SHORTBREAD_SAVEID + ".workshop";

function SaveMods() {
	localStorage.setItem(KernelIndex, JSON.stringify(Kernel.config));
}

Kernel.config = JSON.parse(
	localStorage.getItem(KernelIndex) ? localStorage.getItem(KernelIndex) : "{}"
);

Game.LoadMod("https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js");

function getWorkshopInfo(id) {
	return new Promise((resolve, reject) => {
		var ws = new XMLHttpRequest();

		ws.open(
			"POST",
			"https://corsproxy.io/?https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1"
		);

		ws.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);

		ws.send(`itemcount=1&publishedfileids%5B0%5D=${id}`);

		ws.onload = () => {
			if (ws.status != 200) {
				reject(`HTTP_CODE_${ws.status}`);
				return;
			}

			let json = JSON.parse(ws.responseText);
			let dets = json.response.publishedfiledetails[0];
			if (dets.consumer_app_id != appid) {
				reject(`INVALID_APPID_${dets.consumer_app_id}`);
				return;
			}

			resolve({
				name: dets.title,
				vis: {
					icon: dets.preview_url,
					description: dets.description,
				},
				files: {
					download: dets.file_url,
				},
			});
		};
	});
}

async function getWorkshopCode(id) {
	const info = await getWorkshopInfo(id);

	let downloadURL = info.files.download;

	let req = await fetch(downloadURL);
	let blob = await req.blob();

	let zip = new JSZip();
	await zip.loadAsync(blob);

	let infotxt = JSON.parse(await zip.files["info.txt"].async("text"));
	let mainjs = await zip.files["main.js"].async("text");

	return { infotxt, mainjs };
}

async function loadWorkshopMod(mod) {
	var { infotxt, mainjs } = await getWorkshopCode(mod);

	console.log(infotxt);

	modInfo[mod] = infotxt;
	window.currentMain = mainjs;

	(() => {
		eval(window.currentMain);
	}).call(window);

	console.log(modInfo, Kernel.config);
}

function workshop() {
	function ModsContainer() {
		var list = "";
		for (mod in Kernel.config) {
			list += `
			<div style="border-bottom:1px dashed rgba(255,255,255,0.2);clear:both;overflow:hidden;padding:4px 0px;">
				<div style="float:left;width:49%;text-align:left;overflow:hidden;">
					<b>${modInfo[mod].Name}</b><br><small>${mod}</small>
				</div>
				<div style="float:right;width:49%;text-align:right;overflow:hidden;">
					<a class="option warning" style="padding:0px 2px;font-size:10px;margin:0px;vertical-align:top;" onclick="delete window.Kernel.config['${mod}'];SaveMods();window.workshop()">Delete</a>
				</div>
			</div>
			`;
		}

		if (!list)
			list += `<div style="border-bottom:1px dashed rgba(255,255,255,0.2);clear:both;overflow:hidden;padding:4px 0px;">
		<div style="float:left;width:49%;text-align:left;overflow:hidden;">
			<b>No mods are here.</b><br><small>Get a workshop mod ID and add it to the list.</small>
		</div>
	</div>`;

		return list;
	}

	Game.Prompt(
		`
		${ModsContainer()}
		<br>
		<b><u>Add Mod</u></b><br>
		<input id=url class='framed' style='width:220px;border-image: url(img/frameBorder.png) 4 round;text-align:center;' placeholder='12345678'>
		`,
		[["Add Mod", "window.addMod(document.getElementById('url').value)"]]
	);
}

let modInfo = {};

for (mod in Kernel.config) {
	loadWorkshopMod(mod);
}

document.getElementById("versionNumber").innerHTML +=
	'<br><a onclick="window.workshop()"><small>Open Workshop</small></a>';
