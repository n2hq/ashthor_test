import { useState } from "react";
import { useOperation } from "~/context/OperationContext";

export default function BusinessUserSelector({ userGuid }: any) {
    const [businessQuery, setBusinessQuery] = useState("");
    const [businessResults, setBusinessResults] = useState<any[]>([]);
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

    const [userQuery, setUserQuery] = useState("");
    const [userResults, setUserResults] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()

    // Search businesses
    const handleBusinessSearch = async (q: string) => {
        setBusinessQuery(q);
        if (q.length < 2) return setBusinessResults([]);
        const res = await fetch(`/api/listing/business_single_search?q=${encodeURIComponent(q)}&user_guid=${userGuid}`);
        const data = await res.json();
        setBusinessResults(data);
    };

    // Search users
    const handleUserSearch = async (q: string) => {
        setUserQuery(q);
        if (q.length < 2) return setUserResults([]);
        const res = await fetch(`/api/listing/user_single_search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setUserResults(data);
    };


    const handleReassign = async () => {
        showOperation('processing')


        if (!selectedUser || !selectedBusiness) {
            showError('Error', `Please select both a user and a business before submitting.`)
            completeOperation()
            //alert("Please select both a user and a business before submitting.");
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = JSON.parse(JSON.stringify(selectedUser))
        const business = JSON.parse(JSON.stringify(selectedBusiness))
        const query = {
            user_guid: user.user_guid,
            previous_owner_guid: business.owner,
            business_guid: business.gid
        }
        console.log(user)
        console.log(business)
        console.log(query)

        try {
            const res = await fetch("/api/listing/reassign_business", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(query),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error response:", errorText);
                showError('Error', `${errorText}`)
                completeOperation()
                //alert(`Failed: ${errorText}`);
                return;
            }

            const data = await res.json();
            //console.log("Success:", data);
            //alert("Business reassigned successfully!");

            showSuccess('Success', 'Business reassigned successfully!')
            completeOperation()
        } catch (error) {
            console.error("Request failed:", error);
            showError('Error', `Something went wrong while reassigning.`)
            completeOperation()
            //alert("Something went wrong while reassigning.");
        }
    }

    return (
        <div className="space-y-6 p-4 max-w-lg">

            {/* Business Search */}
            <div className={`relative`}>
                <label className="block text-sm font-medium mb-1">Search Business</label>
                <input
                    id="biz"
                    type="text"
                    value={businessQuery}
                    onChange={(e) => handleBusinessSearch(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Type business name..."
                />
                {businessResults.length > 0 && (
                    <ul className={`border mt-2 rounded bg-white shadow divide-y`}>
                        {
                            businessResults?.map((biz, index: number) => {
                                const isEven = index % 2 === 0 ? true : false
                                return (
                                    <li
                                        key={biz.id}
                                        onClick={() => {
                                            setSelectedBusiness(biz);
                                            setBusinessResults([]);
                                            setBusinessQuery(biz.title);
                                        }}
                                        className={`${isEven ? 'bg-gray-50' : 'bg-white'} p-2 cursor-pointer hover:bg-gray-100`}
                                    >
                                        {biz.title}
                                    </li>
                                )
                            })}
                    </ul>
                )}
                {selectedBusiness && (
                    <input type="hidden" name="businessId" value={selectedBusiness.id} />
                )}
            </div>

            {/* User Search */}
            <div className={`relative w-full`}>
                <label className="block text-sm font-medium mb-1">Search User</label>
                <input
                    id="user"
                    type="text"
                    value={userQuery}
                    onChange={(e) => handleUserSearch(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Type user name..."
                />
                {userResults.length > 0 && (
                    <ul className={`absolute border mt-2 rounded bg-white shadow divide-y w-full max-h-[200px] overflow-y-auto`}>
                        {userResults.map((u, index: number) => {
                            const isEven = index % 2 === 0 ? true : false
                            return (
                                <li
                                    key={u.id}
                                    onClick={() => {

                                        setSelectedUser(u);
                                        setUserResults([]);
                                        setUserQuery(`${u.first_name}, ${u.lastname}`);
                                    }}
                                    className={`${isEven ? 'bg-gray-50' : 'bg-white'} p-2 cursor-pointer hover:bg-gray-100`}
                                >
                                    {u.first_name}, {u.lastname}
                                </li>
                            )
                        })}
                    </ul>
                )}
                {selectedUser && (
                    <input type="hidden" name="userId" value={selectedUser.id} />
                )}
            </div>

            <button
                type="submit"
                onClick={handleReassign}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </div>
    );
}
