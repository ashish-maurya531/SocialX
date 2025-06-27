// MongoDB init script for SocialX chat service
// Run in the mongo shell or as a JS script

db = db.getSiblingDB('socialx_chat');
db.createCollection('messages');