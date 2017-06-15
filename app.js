console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleDesc = {
      describe: 'Title of note',  //description of argument
      demand: true,               //argument required
      alias: 't'                  //alias / shorthand for argument
    };
const bodyDesc = {
      describe: 'Body text of note',
      demand: true,
      alias: 'b'
    };

const argv = yargs
  .command('add', 'Add a new note', { //add command to --help output
    title: titleDesc,
    body: bodyDesc
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleDesc
  })
  .command('remove', 'Remove a note', {
    title: titleDesc
  })
  .help() //add --help functionality to cli
  .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var list = notes.getAll();
  console.log(`Listing ${list.length} note${(list.length === 0 || list.length > 1 ? 's' : '')}`);
  list.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
