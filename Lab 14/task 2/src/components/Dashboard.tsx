import React from 'react';
import { ShoppingBag, DollarSign, Users, Activity } from 'lucide-react';
import useStore from '../store/useStore';

export function Dashboard() {
  const { cart, products } = useStore();

  const totalCartValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'Cart Value',
      value: `$${totalCartValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Active Users',
      value: '1,234',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: Activity,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">
                    Quantity: {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
          <div className="space-y-4">
            {['electronics', 'jewelery', "men's clothing", "women's clothing"].map(
              (category) => (
                <div
                  key={category}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <span className="capitalize">
                    {category}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    {products.filter((p) => p.category === category).length} items
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}