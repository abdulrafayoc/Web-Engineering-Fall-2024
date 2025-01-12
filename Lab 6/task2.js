const participants = [];
const maxCapacity = 100;

function addParticipant(name, email, ticketType) {
  if (participants.length < maxCapacity) {
    participants.push({ name, email, ticketType });
    console.log("Participant added successfully!");
  } else {
    console.log("Event is full. Cannot add more participants.");
  }
}

function checkAvailability() {
  return participants.length < maxCapacity;
}

function listParticipants() {
  console.log("Registered Participants:");
  participants.forEach((participant) => {
    console.log(`- ${participant.name} (${participant.email}) - ${participant.ticketType}`);
  });
}

// Example usage
addParticipant("Alice", "alice@example.com", "VIP");
addParticipant("Adam", "bob@example.com", "General");
checkAvailability(); 
listParticipants();