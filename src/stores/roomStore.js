import { makeObservable, observable, action } from "mobx";
import axios from "axios";

class RoomStore {
  rooms = [
    {
      image:
        "https://mk0peerspaceres622pi.kinstacdn.com/wp-content/uploads/Eco-Friendly-Executive-Boardroom-santa-monica-la-los-angeles-rental-1200x600.jpg",
      id: 1,
      title: "Meeting room",
      description: "Only people invited for the meeting!",
      slug: "meeting-room",
      messages: [
        {
          msg: "Hi Hacker, How are you?",
        },
        {
          msg: "I am fine.",
        },
      ],
    },
  ];
  constructor() {
    makeObservable(this, {
      rooms: observable,
      createRoom: action,
      updateRoom: action,
      deleteRoom: action,
      createMsg: action,
    });
  }

  createRoom = async (room) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        room
      );

      this.rooms.push(response.data);
    } catch (error) {
      console.log("I am in create Room catch error");
    }
  };

  deleteRoom = async (roomId) => {
    try {
      await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
      );
      this.rooms = this.rooms.filter((room) => room.id !== roomId);
    } catch (error) {
      console.log("I am in delete room catch error");
    }
  };
  createMsg = async (roomId, msg) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
      const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
      this.rooms[roomIndex].messages.push(response.data);
    } catch (error) {
      console.log("I am in catch createmsg", error);
    }
  };

  updateRoom = async (updatedRoom) => {
    try {
      const room = this.rooms.find((room) => room.id === updatedRoom.id);
      room.title = updatedRoom.title;
      room.description = updatedRoom.description;
      room.image = updatedRoom.image;
      await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
    } catch (error) {
      console.log("I am in update catch" + error);
    }
  };

  fetchRooms = async () => {
    try {
      console.log("I am in try Fetch");
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.rooms = response.data;
    } catch (error) {
      console.log("I am in catch but I got error" + error);
    }
  };
}

const roomStore = new RoomStore();
roomStore.fetchRooms();
export default roomStore;
