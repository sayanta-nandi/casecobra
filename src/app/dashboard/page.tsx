import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/utils";
import { prisma } from "@/utils/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusDropdown from "./StatusDropdown";

const AdminDashBoard = async () => {
  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shipping_address: true,
    },
  });

  const monthlyRevenue = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      price: true,
    },
  });
  const weeklyRevenue = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      price: true,
    },
  });

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2000;

  return (
    <MaxWidthWrapper>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Weekly Revenue</CardDescription>
              <CardTitle className="text-2xl">
                {formatPrice((weeklyRevenue._sum.price ?? 0) / 100)}
              </CardTitle>
              <CardDescription>
                of {formatPrice(WEEKLY_GOAL)} goal
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Progress value={(weeklyRevenue._sum.price ?? 0) / WEEKLY_GOAL} />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Monthly Revenue</CardDescription>
              <CardTitle className="text-2xl">
                {formatPrice((monthlyRevenue._sum.price ?? 0) / 100)}
              </CardTitle>
              <CardDescription>
                of {formatPrice(MONTHLY_GOAL)} goal
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Progress
                value={(monthlyRevenue._sum.price ?? 0) / MONTHLY_GOAL}
              />
            </CardFooter>
          </Card>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight my-4">
          Incoming Orders
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden sm:block">Purchase Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="flex flex-col">
                  <p>{order.shipping_address?.name}</p>
                  <p className="text-gray-400 hidden sm:block">
                    {order.user.email}
                  </p>
                </TableCell>
                <TableCell>{formatPrice(order.price / 100)}</TableCell>
                <TableCell className="hidden sm:block">
                  {order.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <StatusDropdown
                    orderId={order.id}
                    currStatus={order.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MaxWidthWrapper>
  );
};
export default AdminDashBoard;
