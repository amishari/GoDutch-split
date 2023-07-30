import { useState } from 'react';
import './styles.css';

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}
export default function App() {
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
	const [showAddFriend, setShowAddFriend] = useState(false);
	function addFriendHandler() {
		setShowAddFriend((show) => !show);
	}

	return (
		<div className="App">
			<div className="sidebar">
				<FriendList friends={initialFriends} />
				{showAddFriend && <FormAddFriend />}
				<Button onClick={addFriendHandler}>
					{showAddFriend ? 'Close' : 'Add Friend'}
				</Button>
				<FormSplit />
			</div>
		</div>
	);
}
function FriendList({ friends }) {
	return (
		<ul>
			{friends.map((item) => (
				<Friend key={item.friend} friend={item} />
			))}
		</ul>
	);
}
function Friend({ friend }) {
	return (
		<li>
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
			<Button>Select</Button>
		</li>
	);
}

function FormAddFriend() {
	const [name, setName] = useState('');
	const [img, setImg] = useState('https://i.pravatar.cc/48');
	function handleSubmit(e) {
		e.preventDefault();
		if (!name || !img) return;
		const id = crypto.randomUUID();
		const newFriend = {
			name,
			img: `${img}=${id}`,
			balance: 0,
			id: crypto.randomUUID()
		};
		console.log(newFriend);
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
			<Button>Add </Button>
		</form>
	);
}
function FormSplit() {
	return (
		<form className="form-split-bill">
			<h2>Split a bill with x</h2>
			<label>Bill value</label>
			<input type="text" />
			<label>Your expense</label>
			<input type="text" />
			<label>X expense</label>
			<input type="text" />
			<label>Who's paying?</label>
			<select>
				<option>you</option>
				<option>Your friend</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}
