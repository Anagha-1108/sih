const langData = {
  en: {
    headline: "Stay safe. Explore fearlessly.",
    lead: "A simple SIH app — digital ID, smart geo-fencing, wearables, offline edge AI and instant alerts.",
    wearable: "Wearable connected",
    f1: "GPS + Geo-fencing",
    f1d: "Safe zones; instant alert when boundary crossed.",
    f2: "Offline Fallback",
    f2d: "Works even with no internet using edge AI + local mesh."
  },

  hi: {
    headline: "सुरक्षित रहें। निडर होकर घूमें।",
    lead: "एक सरल SIH ऐप — डिजिटल आईडी, स्मार्ट जियो-फेंसिंग, वियरेबल्स, ऑफ़लाइन AI और त्वरित अलर्ट।",
    wearable: "वियरेबल जुड़ा हुआ",
    f1: "GPS + जियो-फेंसिंग",
    f1d: "सीमा पार करने पर तुरंत अलर्ट।",
    f2: "ऑफ़लाइन मोड",
    f2d: "इंटरनेट न होने पर भी काम करता है।"
  },

  kn: {
    headline: "ಸುರಕ್ಷಿತವಾಗಿರಿ. ಧೈರ್ಯವಾಗಿ ಅನ್ವೇಷಿಸಿ.",
    lead: "ಸರಳ SIH ಆಪ್ — ಡಿಜಿಟಲ್ ಐಡಿ, ಜಿಯೋ-ಫೆನ್ಸಿಂಗ್, ವೇಯರಬಲ್ಸ್ ಮತ್ತು ತ್ವರಿತ ಎಚ್ಚರಿಕೆಗಳು.",
    wearable: "ವೇಯರಬಲ್ ಸಂಪರ್ಕಗೊಂಡಿದೆ",
    f1: "GPS + ಜಿಯೋ-ಫೆನ್ಸಿಂಗ್",
    f1d: "ಸೀಮೆ ದಾಟಿದರೆ ತಕ್ಷಣ ಎಚ್ಚರಿಕೆ.",
    f2: "ಆಫ್ಲೈನ್ ಬ್ಯಾಕಪ್",
    f2d: "ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದರೂ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ."
  },

  te: {
    headline: "సురక్షితంగా ఉండండి. ధైర్యంగా అన్వేషించండి.",
    lead: "సరళమైన SIH యాప్ — డిజిటల్ ID, జియో-ఫెన్సింగ్, వేరబుల్స్, ఆఫ్‌లైన్ AI మరియు వెంటనే అలర్ట్లు.",
    wearable: "వేరబుల్ కనెక్ట్ అయింది",
    f1: "GPS + జియో-ఫెన్సింగ్",
    f1d: "సరిహద్దు దాటితే వెంటనే అలర్ట్.",
    f2: "ఆఫ్‌లైన్ బ్యాకప్",
    f2d: "ఇంటర్నెట్ లేకపోయినా పనిచేస్తుంది."
  }
};

document.getElementById("lang").addEventListener("change", (e) => {
  const l = langData[e.target.value];
  document.getElementById("headline").textContent = l.headline;
  document.getElementById("lead").textContent = l.lead;
  document.getElementById("wearableText").textContent = l.wearable;
  document.getElementById("f1").textContent = l.f1;
  document.getElementById("f1d").textContent = l.f1d;
  document.getElementById("f2").textContent = l.f2;
  document.getElementById("f2d").textContent = l.f2d;
});

/* ------------ BASIC ALERT + WALK + SOS ------------- */

function showAlert(title, body) {
  const toast = document.getElementById("toast");
  document.getElementById("toastTitle").textContent = title;
  document.getElementById("toastBody").textContent = body;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

let online = true;

document.getElementById("toggleOffline").addEventListener("click", () => {
  online = !online;
  document.getElementById("modeBadge").innerHTML =
    "Mode: <span class='kbd'>" + (online ? "Online" : "Offline") + "</span>";

  if (!online) showAlert("Offline Mode", "Working with Bluetooth / LoRa fallback");
  else showAlert("Online Mode", "Cloud sync enabled");
});

document.getElementById("sos").addEventListener("click", () => {
  if (online) showAlert("SOS Sent", "Authorities & emergency contact alerted.");
  else showAlert("SOS Queued", "Stored offline. Will send when online.");
});

/* Simulate Walk (circle around geofence) */
document.getElementById("simulateBtn").addEventListener("click", () => {
  let angle = 0;
  const marker = document.getElementById("marker");

  const sim = setInterval(() => {
    angle += 0.05;
    const x = 200 + Math.cos(angle) * 120;
    const y = 130 + Math.sin(angle) * 120;

    marker.setAttribute("transform", `translate(${x - 200}, ${y - 60})`);

    const inside = Math.pow(x - 200, 2) + Math.pow(y - 130, 2) < Math.pow(80, 2);

    document.getElementById("fenceStatus").textContent = inside ? "Inside" : "Outside";

    if (!inside) showAlert("Boundary Alert", "You have crossed the safe zone!");

  }, 120);

  setTimeout(() => clearInterval(sim), 6000);
});
