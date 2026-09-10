function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Set headers if new sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Ticket ID",
        "Full Name",
        "Phone Number",
        "Faculty",
        "Department",
        "Assigned Color / Team",
        "What Looking Forward To"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    }
    
    // Parse form parameters
    var data = e.parameter;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {}
    }
    
    var timestamp = new Date();
    var ticketId = data.ticket_id || ("UCP-" + Math.random().toString(36).substring(2, 8).toUpperCase());
    var fullName = data.full_name || data.fullName || "";
    var phoneNumber = data.phone_number || data.phoneNumber || "";
    var faculty = data.faculty || "";
    var department = data.department || "";
    var assignedTeam = data.assigned_team || data.assignedTeam || "";
    var lookingForwardTo = data.looking_forward_to || data.lookingForwardTo || "";
    
    // Append row to Google Sheet
    sheet.appendRow([
      timestamp,
      ticketId,
      fullName,
      phoneNumber,
      faculty,
      department,
      assignedTeam,
      lookingForwardTo
    ]);
    
    // Send email notification for every new entry
    var myEmail = "admin@ncfunn.site";
    var subject = "🎉 New Colour Picnic Registration: " + fullName + " (" + faculty + ")";
    var body = 
      "Hello Organizer,\n\n" +
      "A new UNN fresher has registered for Colour Picnic 2026!\n\n" +
      "----------------------------------------\n" +
      "Ticket ID: " + ticketId + "\n" +
      "Name: " + fullName + "\n" +
      "Phone: " + phoneNumber + "\n" +
      "Faculty: " + faculty + "\n" +
      "Department: " + department + "\n" +
      "Color Team: " + assignedTeam + "\n" +
      "Looking Forward To: " + (lookingForwardTo || "N/A") + "\n" +
      "Registered At: " + timestamp.toLocaleString() + "\n" +
      "----------------------------------------\n\n" +
      "View all entries in your spreadsheet here:\n" +
      SpreadsheetApp.getActiveSpreadsheet().getUrl();
      
    MailApp.sendEmail(myEmail, subject, body);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      ticket_id: ticketId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
