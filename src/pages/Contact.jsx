const Contact=()=>{
  return (
    <>
      <style>
      /* Responsive adjustments for mobile viewing */
      @media (max-width: 768px) {
          #contact-hq {
              padding: 40px 15px !important;
          }
          .dossier-container {
              padding: 30px 20px !important;
          }
          .doc-header h2 {
              font-size: 20px !important;
          }
          .table-text {
              font-size: 13px !important;
          }
          .table-padding {
              padding: 10px 2px !important;
          }
          .stamp {
              top: 15px !important;
              left: 15px !important;
              font-size: 12px !important;
          }
      }
  
      /* Stealthy link styling to maintain the typewriter look */
      .comms-link {
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px dotted #1a1a1a;
          transition: color 0.2s ease, background-color 0.2s ease;
      }
      .comms-link:hover {
          color: #8b2222;
          background-color: rgba(139, 34, 34, 0.1);
      }
  </style>
  
  <section id="contact-hq" style="background-color: #272822; padding: 80px 20px; display: flex; justify-content: center; align-items: center; box-sizing: border-box;">
  
      <!-- Main Dossier Container -->
      <div class="dossier-container" style="max-width: 950px; width: 100%; background-color: #e3d8c1; padding: 40px 50px; box-shadow: 0 15px 35px rgba(0,0,0,0.6); position: relative; color: #212121; font-family: 'Times New Roman', Times, serif; background-image: radial-gradient(#d3c8b1 10%, transparent 10%), radial-gradient(#d3c8b1 10%, transparent 10%); background-size: 10px 10px; background-position: 0 0, 5px 5px; border: 1px solid #b8ad96; box-sizing: border-box;">
          
          <!-- Classification Stamp -->
          <div class="stamp" style="position: absolute; top: 30px; left: 40px; color: #8b2222; font-weight: bold; border: 3px solid #8b2222; padding: 4px 10px; font-size: 16px; font-family: 'Courier New', Courier, monospace; opacity: 0.85; transform: rotate(-3deg); letter-spacing: 2px; z-index: 10;">
              RESTRICTED
          </div>
  
          <!-- Document Header -->
          <div class="doc-header" style="border-bottom: 3px solid #212121; padding-bottom: 20px; margin-bottom: 40px; text-align: center; margin-top: 30px;">
              <h2 style="margin: 0; font-size: 26px; text-transform: uppercase; letter-spacing: 3px; font-weight: normal;">War Department - Signal Corps</h2>
              <p style="margin: 8px 0 0 0; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; font-family: 'Courier New', Courier, monospace;">
                  Operation: Invictus 1.0 - Theatre of War
              </p>
              <p style="margin: 5px 0 0 0; font-size: 13px; font-family: 'Courier New', Courier, monospace; color: #555;">
                  FILE REF: DJSCE-EXPRESS-08-2026
              </p>
          </div>
  
          <!-- Two Column Layout (Image & Table) -->
          <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start;">
              
              <!-- Left Column: Equipment Reference -->
              <div style="flex: 1; min-width: 260px; display: flex; flex-direction: column; align-items: center; margin: 0 auto;">
                  <div style="background-color: #f9f6f0; padding: 10px 10px 30px 10px; box-shadow: 2px 3px 6px rgba(0,0,0,0.3); border: 1px solid #ccc; transform: rotate(1deg); width: 100%; max-width: 320px; box-sizing: border-box;">
                      <!-- Included the exact radio image specified -->
                      <img src="image.png" alt="Standard Issue Field Radio" style="width: 100%; height: auto; filter: grayscale(40%) sepia(30%) contrast(110%); border: 1px solid #333;">
                      <p style="text-align: center; font-size: 13px; font-family: 'Courier New', Courier, monospace; margin: 15px 0 0 0; color: #333; font-style: italic;">
                          Fig 1. Standard Issue Transmitter
                      </p>
                  </div>
              </div>
  
              <!-- Right Column: Personnel Roster -->
              <div style="flex: 1.5; min-width: 280px; width: 100%;">
                  <h3 style="font-family: 'Courier New', Courier, monospace; font-size: 18px; text-decoration: underline; margin-top: 0; margin-bottom: 20px;">
                      APPROVED COMMUNICATION CHANNELS:
                  </h3>
                  <p style="font-family: 'Courier New', Courier, monospace; font-size: 14px; margin-bottom: 25px; line-height: 1.5;">
                      The following personnel are authorized to receive direct transmissions regarding registration, deployment, and frontline inquiries.
                  </p>
  
                  <!-- Typewriter Style Table -->
                  <div style="overflow-x: auto;">
                      <table class="table-text" style="width: 100%; border-collapse: collapse; font-family: 'Courier New', Courier, monospace; font-size: 15px; color: #1a1a1a; min-width: 320px;">
                          <thead>
                              <tr style="border-bottom: 2px solid #212121;">
                                  <th class="table-padding" style="text-align: left; padding: 10px 5px;">DESIGNATION</th>
                                  <th class="table-padding" style="text-align: left; padding: 10px 5px;">OFFICER</th>
                                  <th class="table-padding" style="text-align: right; padding: 10px 5px;">FREQUENCY (NO.)</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr style="border-bottom: 1px dashed #999;">
                                  <td class="table-padding" style="padding: 15px 5px;">PR Head</td>
                                  <td class="table-padding" style="padding: 15px 5px; font-weight: bold;">Nandish Vyas</td>
                                  <td class="table-padding" style="text-align: right; padding: 15px 5px;">
                                      <a href="tel:+917039966655" class="comms-link">+91 70399 66655</a>
                                  </td>
                              </tr>
                              <tr style="border-bottom: 1px dashed #999;">
                                  <td class="table-padding" style="padding: 15px 5px;">PR Head</td>
                                  <td class="table-padding" style="padding: 15px 5px; font-weight: bold;">Lavisha Boliya</td>
                                  <td class="table-padding" style="text-align: right; padding: 15px 5px;">
                                      <a href="tel:+919324468782" class="comms-link">+91 93244 68782</a>
                                  </td>
                              </tr>
                              <tr style="border-bottom: 2px solid #212121;">
                                  <td class="table-padding" style="padding: 15px 5px;">Chairperson</td>
                                  <td class="table-padding" style="padding: 15px 5px; font-weight: bold;">Dhruv Thakur</td>
                                  <td class="table-padding" style="text-align: right; padding: 15px 5px;">
                                      <a href="tel:+919076317135" class="comms-link">+91 90763 17135</a>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
  
                  <div class="table-text" style="margin-top: 30px; font-family: 'Courier New', Courier, monospace; font-size: 14px; background-color: #d1c5ae; padding: 15px; border-left: 4px solid #4a4a4a; word-break: break-all;">
                      <strong>GENERAL DISPATCH:</strong><br>
                      <a href="mailto:djsce.express@gmail.com" class="comms-link">djsce.express@gmail.com</a>
                  </div>
              </div>
              
          </div>
          
      </div>
  </section>
</>
  )
}
