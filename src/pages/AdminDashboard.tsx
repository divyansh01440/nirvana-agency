import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  Star,
  FolderKanban,
  Plus,
  Trash2,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useQuery(api.users.currentUser);
  const bookings = useQuery(api.bookings.getAll, {});
  const bookingStats = useQuery(api.bookings.getStats);
  const traffic = useQuery(api.analytics.getTotalTraffic);
  const queries = useQuery(api.queries.getAll, {});
  const queryStats = useQuery(api.queries.getStats);
  const reviews = useQuery(api.reviews.getAll, {});
  const projects = useQuery(api.projects.getAll);

  const updateBookingStatus = useMutation(api.bookings.updateStatus);
  const updateQueryStatus = useMutation(api.queries.updateStatus);
  const toggleReviewApproval = useMutation(api.reviews.toggleApproval);
  const createProject = useMutation(api.projects.create);
  const deleteProject = useMutation(api.projects.remove);

  const [projectForm, setProjectForm] = useState({
    name: "",
    thumbnailUrl: "",
    liveUrl: "",
    description: "",
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen custom-cursor flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page
          </p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      await updateBookingStatus({ bookingId: bookingId as any, status: status as any });
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleQueryStatusUpdate = async (queryId: string, status: "pending" | "resolved") => {
    try {
      await updateQueryStatus({ queryId: queryId as any, status });
      toast.success("Query status updated");
    } catch (error) {
      toast.error("Failed to update query status");
    }
  };

  const handleReviewToggle = async (reviewId: string, approved: boolean) => {
    try {
      await toggleReviewApproval({ reviewId: reviewId as any, approved });
      toast.success(`Review ${approved ? "approved" : "hidden"}`);
    } catch (error) {
      toast.error("Failed to update review");
    }
  };

  const handleProjectCreate = async () => {
    try {
      await createProject(projectForm);
      toast.success("Project created successfully");
      setProjectForm({ name: "", thumbnailUrl: "", liveUrl: "", description: "" });
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const handleProjectDelete = async (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject({ projectId: projectId as any });
        toast.success("Project deleted");
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  return (
    <div className="min-h-screen custom-cursor">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Admin <span className="text-primary">Dashboard</span>
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-strong p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Traffic</p>
                <p className="text-3xl font-bold">{traffic?.visitors || 0}</p>
              </div>
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
          </Card>

          <Card className="glass-strong p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                <p className="text-3xl font-bold">{bookingStats?.total || 0}</p>
              </div>
              <Calendar className="w-10 h-10 text-primary" />
            </div>
          </Card>

          <Card className="glass-strong p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Calls</p>
                <p className="text-3xl font-bold">{bookingStats?.pending || 0}</p>
              </div>
              <Users className="w-10 h-10 text-primary" />
            </div>
          </Card>

          <Card className="glass-strong p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Purchased Services</p>
                <p className="text-3xl font-bold">{bookingStats?.purchased || 0}</p>
              </div>
              <Star className="w-10 h-10 text-primary" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="glass-strong">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="glass-strong p-6">
              <h2 className="text-2xl font-semibold mb-4">Customer Bookings</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings && bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <TableRow key={booking._id}>
                          <TableCell className="font-medium">
                            {booking.companyName}
                          </TableCell>
                          <TableCell>{booking.email}</TableCell>
                          <TableCell>{booking.service}</TableCell>
                          <TableCell>{booking.contactNumber}</TableCell>
                          <TableCell>
                            {booking.city}, {booking.state}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={booking.status}
                              onValueChange={(value) =>
                                handleStatusUpdate(booking._id, value)
                              }
                            >
                              <SelectTrigger className="w-[180px] glass">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="glass-strong">
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Attended">Attended</SelectItem>
                                <SelectItem value="Not Attended">
                                  Not Attended
                                </SelectItem>
                                <SelectItem value="Not Sure">Not Sure</SelectItem>
                                <SelectItem value="Purchased Service">
                                  Purchased Service
                                </SelectItem>
                                <SelectItem value="Not Interested">
                                  Not Interested
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No bookings yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Queries Tab */}
          <TabsContent value="queries">
            <Card className="glass-strong p-6">
              <h2 className="text-2xl font-semibold mb-4">Customer Queries</h2>
              <div className="space-y-4">
                {queries && queries.length > 0 ? (
                  queries.map((query) => (
                    <Card key={query._id} className="glass p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{query.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {query.email}
                          </p>
                        </div>
                        <Select
                          value={query.status}
                          onValueChange={(value) =>
                            handleQueryStatusUpdate(
                              query._id,
                              value as "pending" | "resolved"
                            )
                          }
                        >
                          <SelectTrigger className="w-[140px] glass">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="glass-strong">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-muted-foreground">{query.message}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    No queries yet
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="glass-strong p-6">
              <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Card key={review._id} className="glass p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "text-muted"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <Button
                          variant={review.approved ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            handleReviewToggle(review._id, !review.approved)
                          }
                        >
                          {review.approved ? "Approved" : "Approve"}
                        </Button>
                      </div>
                      <p className="text-muted-foreground">{review.feedback}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    No reviews yet
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card className="glass-strong p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Projects</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-black">
                      <Plus size={16} className="mr-2" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-strong">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Project Name</Label>
                        <Input
                          value={projectForm.name}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, name: e.target.value })
                          }
                          className="glass"
                        />
                      </div>
                      <div>
                        <Label>Thumbnail URL</Label>
                        <Input
                          value={projectForm.thumbnailUrl}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              thumbnailUrl: e.target.value,
                            })
                          }
                          className="glass"
                        />
                      </div>
                      <div>
                        <Label>Live URL</Label>
                        <Input
                          value={projectForm.liveUrl}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, liveUrl: e.target.value })
                          }
                          className="glass"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={projectForm.description}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              description: e.target.value,
                            })
                          }
                          className="glass"
                        />
                      </div>
                      <Button
                        onClick={handleProjectCreate}
                        className="w-full rounded-full bg-primary hover:bg-primary/90 text-black"
                      >
                        Create Project
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <Card key={project._id} className="glass p-4">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold mb-2">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => handleProjectDelete(project._id)}
                      >
                        <Trash2 size={14} className="mr-2" />
                        Delete
                      </Button>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-full text-center py-8 text-muted-foreground">
                    No projects yet
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
