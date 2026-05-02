 // ========== TOAST NOTIFICATION SYSTEM ==========
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    switch(type) {
      case 'success': icon = 'fa-check-circle'; break;
      case 'error': icon = 'fa-exclamation-circle'; break;
      case 'warning': icon = 'fa-exclamation-triangle'; break;
      case 'info': icon = 'fa-info-circle'; break;
      default: icon = 'fa-check-circle';
    }
    
    toast.innerHTML = `
      <i class="fas ${icon}"></i>
      <span class="toast-message">${message}</span>
      <i class="fas fa-times toast-close"></i>
    `;
    
    container.appendChild(toast);
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    });
    
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  // ========== SECTION SWITCHING ==========
  function showSection(id, event) {
    document.querySelectorAll(".account-section").forEach(section => {
      section.classList.remove("active");
    });
    
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
    
    document.querySelectorAll(".sidebar-link").forEach(link => {
      link.classList.remove("active");
    });
    
    if (event) event.currentTarget.classList.add("active");
    showToast(`Switched to ${id === 'profile-section' ? 'Profile' : 'Security'} section`, "info");
  }

  // ========== PROFILE EDIT SYSTEM ==========
  const profileSection = document.getElementById("profile-section");

  if (profileSection) {
    const editBtn = document.getElementById("editProfileBtn");
    const saveBtn = document.getElementById("saveProfileBtn");
    const cancelBtn = document.getElementById("cancelProfileBtn");
    const profileActions = document.getElementById("profileActions");
    const changePhotoBtn = document.getElementById("changePhotoBtn");
    const removePhotoBtn = document.getElementById("removePhotoBtn");
    const profilePic = document.getElementById("profilePic");

    let originalData = {};

    function storeOriginalData() {
      profileSection.querySelectorAll(".info-group").forEach(group => {
        const p = group.querySelector("p");
        const input = group.querySelector("input");
        if (p && input && input.dataset.field) {
          originalData[input.dataset.field] = p.textContent;
        }
      });
    }

    editBtn?.addEventListener("click", () => {
      profileSection.classList.add("editing");
      if (profileActions) profileActions.style.display = "flex";
      if (editBtn) editBtn.style.display = "none";
      storeOriginalData();
      
      profileSection.querySelectorAll(".info-group").forEach(group => {
        const p = group.querySelector("p");
        const input = group.querySelector("input");
        if (p && input && input.dataset.field) {
          input.value = p.textContent;
        }
      });
      showToast("Edit mode activated", "info");
    });

    saveBtn?.addEventListener("click", () => {
      profileSection.querySelectorAll(".info-group").forEach(group => {
        const p = group.querySelector("p");
        const input = group.querySelector("input");
        if (p && input && input.dataset.field) {
          p.textContent = input.value;
        }
      });
      
      profileSection.classList.remove("editing");
      if (profileActions) profileActions.style.display = "none";
      if (editBtn) editBtn.style.display = "inline-flex";
      showToast("Profile updated successfully!", "success");
    });

    cancelBtn?.addEventListener("click", () => {
      profileSection.querySelectorAll(".info-group").forEach(group => {
        const input = group.querySelector("input");
        if (input && input.dataset.field && originalData[input.dataset.field]) {
          input.value = originalData[input.dataset.field];
        }
      });
      
      profileSection.classList.remove("editing");
      if (profileActions) profileActions.style.display = "none";
      if (editBtn) editBtn.style.display = "inline-flex";
      showToast("Changes discarded", "warning");
    });

    changePhotoBtn?.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      
      input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(ev) {
            if (profilePic) {
              profilePic.src = ev.target.result;
              showToast("Profile photo updated!", "success");
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    });

    removePhotoBtn?.addEventListener("click", () => {
      if (profilePic) {
        profilePic.src = "images/default-profile.png";
        showToast("Profile photo removed", "warning");
      }
    });
  }

  // ========== SECURITY SECTION TOASTS ==========
  const updatePasswordBtn = document.getElementById("updatePasswordBtn");
  if (updatePasswordBtn) {
    updatePasswordBtn.addEventListener("click", () => {
      const currentPw = document.getElementById("currentPassword")?.value;
      const newPw = document.getElementById("newPassword")?.value;
      const confirmPw = document.getElementById("confirmPassword")?.value;
      
      if (!currentPw || !newPw || !confirmPw) {
        showToast("Please fill in all password fields", "error");
        return;
      }
      
      if (newPw !== confirmPw) {
        showToast("New password and confirmation do not match", "error");
        return;
      }
      
      if (newPw.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
      }
      
      // Clear fields
      document.getElementById("currentPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
      showToast("Password updated successfully!", "success");
    });
  }

  const enable2FABtn = document.getElementById("enable2FABtn");
  if (enable2FABtn) {
    enable2FABtn.addEventListener("click", () => {
      showToast("Two-Factor Authentication enabled. Check your email for setup.", "success");
    });
  }

  const deleteAccountBtn = document.getElementById("deleteAccountBtn");
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      if (confirm("⚠️ WARNING: This action is irreversible! Are you absolutely sure you want to delete your account?")) {
        showToast("Account deletion request submitted. Check your email to confirm.", "warning");
      } else {
        showToast("Account deletion cancelled", "info");
      }
    });
  }

  // ========== LOGOUT ==========
  const logoutBtn = document.querySelector('[data-logout]');
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      {
        showToast("Logging out...", "info");
        setTimeout(() => {
          window.location.href = "../CourtsideHoops/login.html";
        }, 500);
      }
    });
  }

  // ========== INITIAL ACTIVE SECTION ==========
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".account-section").forEach(s => {
      s.classList.remove("active");
    });
    const defaultSection = document.getElementById("security-section");
    if (defaultSection) defaultSection.classList.add("active");
    showToast("Welcome back, User! 👋", "success");
  });