import { useState } from 'react';
import './styles.css';
const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0
	}
];

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}
export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selected, setSelected] = useState(null);

	function handleShowFriendHandler() {
		setShowAddFriend((show) => !show);
	}
	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriend(false);
	}
	function handleSelect(friend) {
		setSelected((cur) => (cur?.id === friend?.id ? null : friend));
		setShowAddFriend(false);
	}

	return (
		<div className="App">
			<div className="sidebar">
				<FriendList
					friends={friends}
					onSelect={handleSelect}
					selected={selected}
				/>
				{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
				<Button onClick={handleShowFriendHandler}>
					{showAddFriend ? 'Close' : 'Add Friend'}
				</Button>
				{selected && <FormSplit onSelect={selected} />}
			</div>
		</div>
	);
}
function FriendList({ friends, onSelect, selected }) {
	return (
		<ul>
			{friends.map((item) => (
				<Friend
					key={item.friend}
					friend={item}
					onSelect={onSelect}
					selected={selected}
				/>
			))}
		</ul>
	);
}
function Friend({ friend, onSelect, selected }) {
	return (
		<li className={friend?.id === selected?.id ? 'selected' : ''}>
			<img src={friend.image} alt="avatar" />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name}
					{Math.abs(friend.balance)}€
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you {Math.abs(friend.balance)}€
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} are balanced!</p>}
			<Button onClick={() => onSelect(friend)}>
				{selected?.id === friend?.id ? 'Close' : 'Select'}
			</Button>
		</li>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState('');
	const [img, setImg] = useState('https://i.pravatar.cc/48');
	function handleSubmit(e) {
		e.preventDefault();
		if (!name || !img) return;
		const id = crypto.randomUUID(); //only in browser works
		const newFriend = {
			name,
			img: `${img}?u=${id}`, // that's for unique image
			balance: 0,
			id
		};
		onAddFriend(newFriend);
		setName('');
		setImg('https://i.pravatar.cc/48');
	}
	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>friend's Name</label>
			<input
				type="text"
				value={name}
				placeholder="type the name"
				onChange={(e) => setName(e.target.value)}
			/>
			<label>add image</label>
			<input
				type="text"
				value={img}
				placeholder="type img url"
				onChange={(e) => setImg(e.target.value)}
			/>
			<Button onSubmit={handleSubmit}>Add </Button>
		</form>
	);
}
function FormSplit({ onSelect }) {
	const [bill, setBill] = useState('');
	const [paidByUser, setPaidByUser] = useState('');
	const paidByFriend = bill ? bill - paidByUser : ' ';
	const [whoIspaying, setWhoIsPaying] = useState('user');
	return (
		<form className="form-split-bill">
			<h2>Split a bill with {onSelect.name}</h2>
			<label>Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>
			<label>Your expense</label>
			<input
				type="text"
				value={paidByUser}
				onChange={(e) =>
					setPaidByUser(
						Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
					)
				}
			/>
			<label>{onSelect.name}'s expense</label>
			<input value={paidByFriend} type="text" disabled />
			<label>Who's paying?</label>
			<select
				value={whoIspaying}
				onChange={(e) => setWhoIsPaying(e.target.value)}>
				<option value="user">you</option>
				<option value="friend">{onSelect.name}</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}
