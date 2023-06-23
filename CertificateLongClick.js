$(document).ready(function () {
  var clickTimes = [];
  var elementId = "#ID"; // Setzen Sie hier die ID Ihres Elements ein
  var longPressTimer;
  var resetTimer;

  // Modal hinzufügen
  var modalHtml =
    '<div id="custom-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0);z-index:1000;transition: background-color 0.5s ease-in-out;"><div id="custom-modal-content" style="position:absolute;top:50%;left:-50%;transform:translate(-50%,-50%);background-color:white;padding:20px;text-align:center;border-radius:10px;transition: left 0.5s ease-in-out;">Programmiert von Jannis Roloff</div></div>';
  $("body").append(modalHtml);

  // Klicks abhören
  $(elementId).on("mousedown touchstart", function () {
    if (clickTimes.length === 0) {
      // Timer zum Zurücksetzen starten, wenn der erste Klick erkannt wird
      resetTimer = setTimeout(function () {
        clickTimes = [];
      }, 2000);
    }

    clickTimes.push(new Date().getTime());

    // Long press check
    if (clickTimes.length === 4) {
      longPressTimer = setTimeout(function () {
        var durations = [];
        for (var i = 1; i < clickTimes.length; i++) {
          durations.push(clickTimes[i] - clickTimes[i - 1]);
        }

        // Prüfen, ob die ersten drei Klicks kurz waren und der vierte lang
        if (
          durations[0] < 500 &&
          durations[1] < 500 &&
          new Date().getTime() - clickTimes[3] > 1000
        ) {
          $("#custom-modal").show().css("background-color", "rgba(0,0,0,0.5)");
          $("#custom-modal-content").css("left", "50%");
        }

        clickTimes = []; // Array zurücksetzen
        clearTimeout(resetTimer); // Reset-Timer stoppen
      }, 1000);
    }
  });

  // Wenn die Maustaste oder der Touch losgelassen wird
  $(elementId).on("mouseup touchend", function () {
    if (
      clickTimes.length === 4 &&
      new Date().getTime() - clickTimes[3] < 1000
    ) {
      clearTimeout(longPressTimer);
      clickTimes = []; // Array zurücksetzen, wenn der vierte Klick kurz war
      clearTimeout(resetTimer); // Reset-Timer stoppen
    }
  });

  // Modal schließen, wenn im Hintergrund geklickt wird
  $("#custom-modal").on("click", function () {
    $(this).css("background-color", "rgba(0,0,0,0)");
    $("#custom-modal-content").css("left", "-50%");
    $(this).delay(500).hide(0);
  });
});
