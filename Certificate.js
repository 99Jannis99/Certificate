$(document).ready(function () {
  var clickTimes = [];
  var elementId = "#yourElementId"; // Setzen Sie hier die ID Ihres Elements ein

  // Modal hinzufügen
  var modalHtml =
    '<div id="custom-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:1000;"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:white;padding:20px;text-align:center;">Programmiert von Jannis Roloff</div></div>';
  $("body").append(modalHtml);

  // Klicks abhören
  $(elementId).on("mousedown", function () {
    clickTimes.push(new Date().getTime());
  });

  $(elementId).on("mouseup", function () {
    setTimeout(function () {
      if (clickTimes.length >= 4) {
        var durations = [];
        for (var i = 1; i < clickTimes.length; i++) {
          durations.push(clickTimes[i] - clickTimes[i - 1]);
        }

        // Prüfen, ob die ersten drei Klicks kurz waren und der letzte lang
        if (durations[0] < 500 && durations[1] < 500 && durations[2] > 1000) {
          $("#custom-modal").show();
        }
      }

      // Array zurücksetzen
      clickTimes = [];
    }, 1500);
  });

  // Modal schließen, wenn im Hintergrund geklickt wird
  $("#custom-modal").on("click", function () {
    $(this).hide();
  });
});
