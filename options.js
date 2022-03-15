function save_options() {
  var autopause = document.getElementById("autopause").checked;
  var autoresume = document.getElementById("autoresume").checked;
  var scrollpause = document.getElementById("scrollpause").checked;
  var disabled = document.getElementById("disabled").checked;
  chrome.storage.sync.set(
    {
      autopause: autopause,
      autoresume: autoresume,
      scrollpause: scrollpause,
      disabled: disabled,
    },
    function () {
      var status = document.getElementById("status");
      status.textContent = "Saved!";
      setTimeout(function () {
        status.textContent = "";
      }, 1500);
    }
  );
}

function restore_options() {
  chrome.storage.sync.get(
    { autopause: true, autoresume: true, scrollpause: false, disabled: false },
    function (items) {
      document.getElementById("autopause").checked = items.autopause;
      document.getElementById("autoresume").checked = items.autoresume;
      document.getElementById("scrollpause").checked = items.scrollpause;
      document.getElementById("disabled").checked = items.disabled;

      document.getElementById("autopause").disabled = items.disabled;
      document.getElementById("autoresume").disabled = items.disabled;
      document.getElementById("scrollpause").disabled = items.disabled;
    }
  );
}

document.addEventListener("DOMContentLoaded", restore_options);
chrome.storage.onChanged.addListener(function (_changes, _namespace) {
  restore_options();
});
document.getElementById("save").addEventListener("click", save_options);
