const btn = document.getElementById('addCoApplicant');
const sectionCoApplicant = document.getElementById('coApplicantSection');

let isAdded = false;

btn.addEventListener('click', () => {
  if (!isAdded) {
    addCoApplicant();
    isAdded = true;

    // меняем кнопку
    btn.querySelector('.btn-coapplicant__icon').textContent = '−';
    btn.querySelector('.btn-coapplicant__text').textContent = 'Remove Co-Applicant';

    setTimeout(() => {
      const title = document.getElementById('coApplicantTitle');
      if (title) {
        title.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  } else {
    removeCoApplicant();
    isAdded = false;

    // возвращаем кнопку
    btn.querySelector('.btn-coapplicant__icon').textContent = '+';
    btn.querySelector('.btn-coapplicant__text').textContent = 'Add Co-Applicant';
  }
});

// function addCoApplicant() {
//   sectionCoApplicant.innerHTML = `
//     <div>
//       <h3 id="coApplicantTitle" class="text-lg font-semibold text-white mb-4">Co-Applicant Information</h3>

//       <!-- CONTACT -->
//       <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input type="text" placeholder="* First Name" class="form-input" />
//         <input type="text" placeholder="Middle Initial" class="form-input" />
//         <input type="text" placeholder="* Last Name" class="form-input" />
//       </div>

//       <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <input type="tel" placeholder="* Day Phone" class="form-input" />
//         <input type="tel" placeholder="Evening Phone" class="form-input" />
//       </div>

//       <input type="text" placeholder="Best time to call?" class="form-input mt-4" />
//       <input type="email" placeholder="* Email" class="form-input mt-4" />

//       <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <input type="text" placeholder="* Social Security Number" class="form-input" />
//         <input type="date" class="form-input" />
//       </div>
//     </div>

//     <!-- ADDRESS -->
//     <div>
//       <h3 class="text-lg font-semibold text-white mb-4">Co-Applicant Address</h3>

//       <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input type="text" placeholder="* Street" class="form-input" />
//         <input type="text" placeholder="Apt. No." class="form-input" />
//       </div>

//       <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//         <input type="text" placeholder="* City" class="form-input" />
//         <input type="text" placeholder="* State" class="form-input" />
//         <input type="text" placeholder="* Zip" class="form-input" />
//       </div>

//       <select class="form-input form-select mt-4">
//         <option value="">* Rent or Own?</option>
//         <option>Rent</option>
//         <option>Own</option>
//       </select>

//       <input type="text" placeholder="Landlord / Mortgage Company" class="form-input mt-4" />
//       <input type="text" placeholder="* Rent / Mortgage Payment" class="form-input mt-4" />

//       <div class="flex items-center gap-4 mt-4">
//         <!-- Label -->
//           <div class="w-1/2 text-sm text-gray-400">Time at Current Residence</div>

//         <!-- Inputs -->
//           <div class="w-1/2 grid grid-cols-2 gap-4">
//               <input type="number" placeholder="* Years" class="form-input" />
//               <input type="number" placeholder="* Months" class="form-input" />
//           </div>
//       </div>

//       <!-- PREVIOUS ADDRESS (optional) -->
//       <div class="mt-6 border-t border-gray-800 pt-6">
//         <h4 class="text-sm text-gray-300 mb-4">Previous Residence (If less than 2 years)</h4>

//         <select class="form-input form-select">
//             <option value="">Previous Rent or Own</option>
//             <option>Rent</option>
//             <option>Own</option>
//         </select>

//         <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             <input type="text" placeholder="Previous Street" class="form-input" />
//             <input type="text" placeholder="Previous Apt. No." class="form-input" />
//         </div>

//         <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//             <input type="text" placeholder="Previous City" class="form-input" />
//             <input type="text" placeholder="Previous State" class="form-input" />
//             <input type="text" placeholder="Previous Zip" class="form-input" />
//         </div>

//         <div class="flex items-center gap-4 mt-4">
//             <!-- Label -->
//             <div class="w-1/2 text-sm text-gray-400">Time at Previous Residence</div>

//             <!-- Inputs -->
//             <div class="w-1/2 grid grid-cols-2 gap-4">
//                 <input type="number" placeholder="Years" class="form-input" />
//                 <input type="number" placeholder="Months" class="form-input" />
//             </div>
//         </div>
//       </div>

//     </div>

//     <!-- EMPLOYMENT -->
//     <div>
//       <h3 class="text-lg font-semibold text-white mb-4">Co-Applicant Employment</h3>

//       <select class="form-input form-select">
//         <option value="">* Employment Status</option>
//         <option>Employed</option>
//         <option>Self-employed</option>
//         <option>Unemployed</option>
//       </select>

//       <input type="text" placeholder="* Company Name" class="form-input mt-4" />
//       <input type="text" placeholder="* Occupation" class="form-input mt-4" />
//       <input type="tel" placeholder="* Business Phone" class="form-input mt-4" />

//       <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//         <input type="text" placeholder="* City" class="form-input" />
//         <input type="text" placeholder="* State" class="form-input" />
//         <input type="text" placeholder="* Zip" class="form-input" />
//       </div>

//       <div class="flex items-center gap-4 mt-4">
//         <div class="w-1/2 text-sm text-gray-400">Time at Current Employer</div>
//         <div class="w-1/2 grid grid-cols-2 gap-4">
//           <input type="number" placeholder="* Years" class="form-input" />
//           <input type="number" placeholder="* Months" class="form-input" />
//         </div>
//       </div>

//       <input type="text" placeholder="* Gross Income" class="form-input mt-4" />
//       <input type="text" placeholder="Additional Income" class="form-input mt-4" />
//       <input type="text" placeholder="Income Source" class="form-input mt-4" />

//       <!-- Previous Employer (optional) -->
//       <div class="mt-6">
//         <h4 class="text-sm text-gray-400 mb-4">Previous Employer (If less than two years)</h4>

//         <input type="text" placeholder="Previous Company Name" class="form-input" />

//         <input type="text" placeholder="Previous Occupation" class="form-input mt-4" />

//         <input type="tel" placeholder="Previous Business Phone" class="form-input mt-4" />

//         <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           <input type="text" placeholder="Previous City" class="form-input" />
//           <input type="text" placeholder="Previous State" class="form-input" />
//           <input type="text" placeholder="Previous Zip" class="form-input" />
//         </div>

//         <div class="flex items-center gap-4 mt-4">
//             <!-- Label -->
//             <div class="w-1/2 text-sm text-gray-400">Time at Previous Employer</div>

//             <!-- Inputs -->
//             <div class="w-1/2 grid grid-cols-2 gap-4">
//                 <input type="number" placeholder="Years" class="form-input" />
//                 <input type="number" placeholder="Months" class="form-input" />
//             </div>
//         </div>
//       </div>
//     </div>
//   `;

//   sectionCoApplicant.classList.remove('hidden');
// }

function addCoApplicant() {
  sectionCoApplicant.innerHTML = `
    
    <!-- CONTACT -->
    <div>
      <h3 id="coApplicantTitle" class="text-lg font-semibold text-white mb-4">
        Co-Applicant Information
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" placeholder="* First Name" class="form-input" />
        <input type="text" placeholder="Middle Initial" class="form-input" />
        <input type="text" placeholder="* Last Name" class="form-input" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input type="tel" placeholder="* Day Phone" class="form-input" />
        <input type="tel" placeholder="Evening Phone" class="form-input" />
      </div>

      <input type="text" placeholder="Best time to call?" class="form-input mt-4" />
      <input type="email" placeholder="* Email" class="form-input mt-4" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input type="text" placeholder="* Social Security Number" class="form-input" />
        <input type="date" class="form-input" />
      </div>
    </div>

    <!-- ADDRESS -->
    <div class="mt-6">
      <h3 class="text-lg font-semibold text-white mb-4">
        Co-Applicant Address
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- LEFT -->
        <div class="space-y-4">
          <h4 class="text-sm text-gray-300">Current Address</h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="* Street" class="form-input" />
            <input type="text" placeholder="Apt. No." class="form-input" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="* City" class="form-input" />
            <input type="text" placeholder="* State" class="form-input" />
            <input type="text" placeholder="* Zip" class="form-input" />
          </div>

          <select class="form-input form-select">
            <option value="">* Rent or Own?</option>
            <option>Rent</option>
            <option>Own</option>
          </select>

          <input type="text" placeholder="Landlord / Mortgage Company" class="form-input" />
          <input type="text" placeholder="* Rent / Mortgage Payment" class="form-input" />

          <div class="flex items-center gap-4">
            <div class="w-1/2 text-sm text-gray-400">
              Time at Current Residence
            </div>

            <div class="w-1/2 grid grid-cols-2 gap-4">
              <input type="number" placeholder="* Years" class="form-input" />
              <input type="number" placeholder="* Months" class="form-input" />
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="space-y-4 border-t md:border-t-0 md:border-l border-gray-800 md:pl-6 pt-6 md:pt-0">
          <h4 class="text-sm text-gray-300">
            Previous Residence (If less than 2 years)
          </h4>

          <select class="form-input form-select">
            <option value="">Previous Rent or Own</option>
            <option>Rent</option>
            <option>Own</option>
          </select>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Previous Street" class="form-input" />
            <input type="text" placeholder="Previous Apt. No." class="form-input" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Previous City" class="form-input" />
            <input type="text" placeholder="Previous State" class="form-input" />
            <input type="text" placeholder="Previous Zip" class="form-input" />
          </div>

          <div class="flex items-center gap-4">
            <div class="w-1/2 text-sm text-gray-400">
              Time at Previous Residence
            </div>

            <div class="w-1/2 grid grid-cols-2 gap-4">
              <input type="number" placeholder="Years" class="form-input" />
              <input type="number" placeholder="Months" class="form-input" />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- EMPLOYMENT -->
    <div class="mt-6">
      <h3 class="text-lg font-semibold text-white mb-4">
        Co-Applicant Employment
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- LEFT -->
        <div class="space-y-4">
          <h4 class="text-sm text-gray-300">Current Employment</h4>

          <select class="form-input form-select">
            <option value="">* Employment Status</option>
            <option>Employed</option>
            <option>Self-employed</option>
            <option>Unemployed</option>
          </select>

          <input type="text" placeholder="* Company Name" class="form-input" />
          <input type="text" placeholder="* Occupation" class="form-input" />
          <input type="tel" placeholder="* Business Phone" class="form-input" />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="* City" class="form-input" />
            <input type="text" placeholder="* State" class="form-input" />
            <input type="text" placeholder="* Zip" class="form-input" />
          </div>

          <div class="flex items-center gap-4">
            <div class="w-1/2 text-sm text-gray-400">
              Time at Current Employer
            </div>

            <div class="w-1/2 grid grid-cols-2 gap-4">
              <input type="number" placeholder="* Years" class="form-input" />
              <input type="number" placeholder="* Months" class="form-input" />
            </div>
          </div>

          <input type="text" placeholder="* Gross Income" class="form-input" />
          <input type="text" placeholder="Additional Income" class="form-input" />
          <input type="text" placeholder="Income Source" class="form-input" />
        </div>

        <!-- RIGHT -->
        <div class="space-y-4 border-t md:border-t-0 md:border-l border-gray-800 md:pl-6 pt-6 md:pt-0">
          <h4 class="text-sm text-gray-300">
            Previous Employer (If less than two years)
          </h4>

          <input type="text" placeholder="Previous Company Name" class="form-input" />
          <input type="text" placeholder="Previous Occupation" class="form-input" />
          <input type="tel" placeholder="Previous Business Phone" class="form-input" />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Previous City" class="form-input" />
            <input type="text" placeholder="Previous State" class="form-input" />
            <input type="text" placeholder="Previous Zip" class="form-input" />
          </div>

          <div class="flex items-center gap-4">
            <div class="w-1/2 text-sm text-gray-400">
              Time at Previous Employer
            </div>

            <div class="w-1/2 grid grid-cols-2 gap-4">
              <input type="number" placeholder="Years" class="form-input" />
              <input type="number" placeholder="Months" class="form-input" />
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  sectionCoApplicant.classList.remove('hidden');
}

function removeCoApplicant() {
  sectionCoApplicant.innerHTML = '';
  sectionCoApplicant.classList.add('hidden');
}
