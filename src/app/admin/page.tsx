"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  TrendingUp, 
  Package, 
  MessageSquare,
  LogOut,
  Plus,
  Search,
  Bell,
  Save,
  Trash2,
  Edit,
  Loader2,
  Inbox
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Project, Post } from "@/lib/data";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Mot de passe simple pour la démo
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState<any>({
    siteName: "",
    contactEmail: "",
    contactPhone: "",
    address: ""
  });

  const filteredProjects = projects.filter(p => 
    p.titleKey.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.categoryKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(p => 
    p.titleKey.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nouveau message de Jean B.", time: "10 min", read: false },
    { id: 2, text: "Bienvenue sur le Dashboard FERNO !", time: "1h", read: false },
    { id: 3, text: "Projet 'Robotique Agricole' mis à jour", time: "2h", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setProjects(data.projects || []);
      setPosts(data.posts || []);
      setSettings(data.settings || {
        siteName: "FERNOTECH",
        contactEmail: "",
        contactPhone: "",
        address: ""
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (newProjects: Project[], newPosts: Post[], newSettings?: any) => {
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          projects: newProjects, 
          posts: newPosts, 
          settings: newSettings || settings 
        }),
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveContent(projects, posts, settings);
    alert("Paramètres enregistrés !");
  };

  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;

    let newProjects;
    if (projects.find(p => p.id === editingProject.id)) {
      newProjects = projects.map(p => p.id === editingProject.id ? editingProject : p);
    } else {
      newProjects = [...projects, editingProject];
    }

    setProjects(newProjects);
    saveContent(newProjects, posts);
    setEditingProject(null);
  };

  const handleSavePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPost) return;

    let newPosts;
    if (posts.find(p => p.id === editingPost.id)) {
      newPosts = posts.map(p => p.id === editingPost.id ? editingPost : p);
    } else {
      newPosts = [...posts, editingPost];
    }

    setPosts(newPosts);
    saveContent(projects, newPosts);
    setEditingPost(null);
  };

  const stats = [
    { label: "Projets Actifs", value: projects.length.toString(), icon: Package, color: "text-brand-blue" },
    { label: "Visites Mensuelles", value: "1.2k", icon: TrendingUp, color: "text-brand-green" },
    { label: "Nouveaux Contacts", value: "8", icon: MessageSquare, color: "text-brand-yellow" },
    { label: "Articles Blog", value: posts.length.toString(), icon: FileText, color: "text-white" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass p-10 rounded-[2.5rem] border-white/5 shadow-[0_30px_100px_rgba(0,82,180,0.2)]"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="bg-white px-6 py-5 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.1)] inline-block">
              <img src="/logo.jpg" alt="FERNOTECH Logo" className="h-24 w-auto object-contain" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">FERNO-ADMIN</h1>
            <p className="text-white/40 text-sm mt-2">Connectez-vous pour gérer l'innovation.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Mot de passe Administrateur</label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "w-full bg-white/5 border rounded-2xl px-6 py-4 text-center text-lg tracking-[0.3em] outline-none transition-all",
                  loginError ? "border-brand-red animate-shake" : "border-white/10 focus:border-brand-blue"
                )}
              />
              {loginError && <p className="text-brand-red text-[10px] font-bold text-center mt-2">Mot de passe incorrect.</p>}
            </div>

            <button type="submit" className="w-full py-4 bg-brand-blue text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,82,180,0.4)]">
              Accéder au Dashboard
            </button>
          </form>

          <p className="text-center mt-10 text-[9px] text-white/20 font-bold uppercase tracking-widest">
            FERNOTECH © 2024 • Bangui, RCA
          </p>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-brand-blue animate-spin" />
          <p className="text-white/40 font-bold tracking-widest text-xs uppercase">Chargement de l'univers FERNO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
          <div className="bg-white px-3 py-2 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <img src="/logo.jpg" alt="FERNOTECH Logo" className="h-12 w-auto object-contain" />
          </div>
          <span className="font-bold tracking-tighter text-lg">FERNO-ADMIN</span>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
            { id: "projects", label: "Mes Projets", icon: Package },
            { id: "blog", label: "Blog", icon: FileText },
            { id: "messages", label: "Messages", icon: MessageSquare },
            { id: "settings", label: "Paramètres", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setEditingProject(null); setEditingPost(null); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id 
                  ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(0,82,180,0.3)]" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-brand-red transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Bonjour, <span className="text-brand-yellow">Admin</span></h1>
            <p className="text-white/40 text-sm">Voici l'état de votre écosystème aujourd'hui.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Rechercher un projet, un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-brand-blue w-64 transition-all focus:w-80"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center relative hover:bg-white/10 transition-colors"
              >
                <Bell className="w-4 h-4 text-white/60" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full border border-black animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 glass border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                      <p className="text-xs font-black uppercase tracking-widest">Notifications</p>
                      <button onClick={markAllAsRead} className="text-[10px] text-brand-blue hover:underline font-bold">
                        Tout marquer lu
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
                      {notifications.map(notif => (
                        <div key={notif.id} className={cn("p-4 hover:bg-white/5 transition-colors cursor-pointer", !notif.read && "bg-brand-blue/5")}>
                          <p className={cn("text-xs mb-1", notif.read ? "text-white/60" : "text-white font-bold")}>{notif.text}</p>
                          <p className="text-[9px] text-white/20">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-green p-0.5 shadow-[0_0_15px_rgba(0,82,180,0.4)] hover:scale-110 transition-transform"
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-black text-xs text-white">
                  FT
                </div>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 glass border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5 bg-white/5">
                      <p className="text-xs font-bold">Admin Fernotech</p>
                      <p className="text-[10px] text-white/40">admin@fernotech.cf</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[11px] text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <Users className="w-3.5 h-3.5" /> Mon Profil
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[11px] text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <Settings className="w-3.5 h-3.5" /> Sécurité
                      </button>
                      <div className="h-px bg-white/5 my-2" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[11px] text-brand-red hover:bg-brand-red/10 rounded-xl transition-all"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-3xl border-white/5"
                >
                  <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                  <p className="text-3xl font-black">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 glass rounded-3xl p-8 border-white/5">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-xl">Derniers Projets</h3>
                  <button 
                    onClick={() => {
                      setEditingProject({ id: Date.now().toString(), titleKey: "", categoryKey: "", image: "", descKey: "", detailsKeys: [], tech: [] });
                      setActiveTab("projects");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-black rounded-xl text-xs font-black hover:scale-105 transition-transform"
                  >
                    <Plus className="w-3 h-3" /> Nouveau Projet
                  </button>
                </div>
                <div className="space-y-4">
                  {filteredProjects.length === 0 ? (
                    <div className="py-12 flex flex-col items-center text-white/20">
                      <Inbox className="w-12 h-12 mb-4 opacity-50" />
                      <p className="text-sm font-bold uppercase tracking-widest">Aucun résultat</p>
                    </div>
                  ) : (
                    filteredProjects.slice(0, 3).map((proj) => (
                      <div key={proj.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                            {proj.image ? <img src={proj.image} className="w-full h-full object-cover" /> : <Package className="w-4 h-4 opacity-20" />}
                          </div>
                          <div>
                            <p className="font-bold text-sm group-hover:text-brand-blue transition-colors">{proj.titleKey}</p>
                            <p className="text-[10px] text-white/30 font-medium">{proj.categoryKey}</p>
                          </div>
                        </div>
                        <button onClick={() => { setEditingProject(proj); setActiveTab("projects"); }} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-white/40" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="glass rounded-3xl p-8 border-white/5">
                <h3 className="font-bold text-xl mb-8">Messages Récents</h3>
                <div className="space-y-6">
                  {[
                    { user: "Jean B.", msg: "Besoin d'un devis pour...", time: "10 min" },
                    { user: "Marie L.", msg: "Félicitations pour le projet...", time: "45 min" },
                    { user: "Kevin S.", msg: "Est-ce que vous livrez à...", time: "2h" },
                  ].map((msg, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex flex-shrink-0 items-center justify-center text-[10px] font-bold text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                        {msg.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-bold text-xs group-hover:text-brand-blue transition-colors">{msg.user}</p>
                          <p className="text-[9px] text-white/20">{msg.time}</p>
                        </div>
                        <p className="text-[10px] text-white/40 line-clamp-1">{msg.msg}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/60 rounded-xl text-xs font-bold transition-all mt-4" onClick={() => setActiveTab("messages")}>
                    Voir tous les messages
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Projets</h2>
              {!editingProject && (
                <button 
                  onClick={() => setEditingProject({ id: Date.now().toString(), titleKey: "", categoryKey: "", image: "", descKey: "", detailsKeys: [], tech: [] })}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(0,82,180,0.3)] hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" /> Ajouter un Projet
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {editingProject ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSaveProject}
                  className="glass p-8 rounded-3xl border-white/5 space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Clé du Titre (i18n)</label>
                      <input 
                        required
                        value={editingProject.titleKey}
                        onChange={e => setEditingProject({...editingProject, titleKey: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                        placeholder="ex: project_1_title"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Catégorie (i18n)</label>
                      <input 
                        required
                        value={editingProject.categoryKey}
                        onChange={e => setEditingProject({...editingProject, categoryKey: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                        placeholder="ex: project_1_category"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">URL de l'image</label>
                    <input 
                      required
                      value={editingProject.image}
                      onChange={e => setEditingProject({...editingProject, image: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Clé de Description (i18n)</label>
                    <textarea 
                      required
                      rows={3}
                      value={editingProject.descKey}
                      onChange={e => setEditingProject({...editingProject, descKey: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                      placeholder="ex: project_1_desc"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-4 bg-brand-green text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,180,100,0.2)]">
                      <Save className="w-4 h-4" /> Enregistrer le projet
                    </button>
                    <button type="button" onClick={() => setEditingProject(null)} className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                      Annuler
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.length === 0 ? (
                    <div className="col-span-full py-20 glass rounded-3xl border-white/5 flex flex-col items-center justify-center text-white/20">
                      <Inbox className="w-16 h-16 mb-4 opacity-50" />
                      <p className="font-black uppercase tracking-widest">Aucun résultat pour "{searchQuery}"</p>
                    </div>
                  ) : (
                    filteredProjects.map(proj => (
                      <div key={proj.id} className="glass p-6 rounded-3xl border-white/5 group relative overflow-hidden">
                        <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-white/5">
                          <img src={proj.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold mb-1 group-hover:text-brand-blue transition-colors">{proj.titleKey}</h3>
                        <p className="text-xs text-white/40 mb-4">{proj.categoryKey}</p>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all absolute top-8 right-8">
                          <button onClick={() => setEditingProject(proj)} className="p-3 bg-brand-blue rounded-xl text-white shadow-xl hover:scale-110 transition-transform">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm("Supprimer ce projet ?")) {
                                const newProjects = projects.filter(p => p.id !== proj.id);
                                setProjects(newProjects);
                                saveContent(newProjects, posts);
                              }
                            }}
                            className="p-3 bg-brand-red rounded-xl text-white shadow-xl hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {activeTab === "blog" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion du Blog</h2>
              {!editingPost && (
                <button 
                  onClick={() => setEditingPost({ id: Date.now().toString(), titleKey: "", excerptKey: "", image: "", date: new Date().toLocaleDateString(), author: "Admin", category: "Innovation" })}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(0,82,180,0.3)] hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" /> Nouvel Article
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {editingPost ? (
                <motion.form 
                  key="blog-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSavePost}
                  className="glass p-8 rounded-3xl border-white/5 space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Clé du Titre (i18n)</label>
                      <input 
                        required
                        value={editingPost.titleKey}
                        onChange={e => setEditingPost({...editingPost, titleKey: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                        placeholder="ex: post_1_title"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Catégorie</label>
                      <input 
                        required
                        value={editingPost.category}
                        onChange={e => setEditingPost({...editingPost, category: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                        placeholder="ex: Innovation"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">URL de l'image</label>
                    <input 
                      required
                      value={editingPost.image}
                      onChange={e => setEditingPost({...editingPost, image: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Clé de l'Extrait (i18n)</label>
                    <textarea 
                      required
                      rows={3}
                      value={editingPost.excerptKey}
                      onChange={e => setEditingPost({...editingPost, excerptKey: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-colors"
                      placeholder="ex: post_1_excerpt"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-4 bg-brand-green text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,180,100,0.2)]">
                      <Save className="w-4 h-4" /> Publier l'article
                    </button>
                    <button type="button" onClick={() => setEditingPost(null)} className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                      Annuler
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="blog-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredPosts.length === 0 ? (
                    <div className="col-span-full py-20 glass rounded-3xl border-white/5 flex flex-col items-center justify-center text-white/20">
                      <Inbox className="w-16 h-16 mb-4 opacity-50" />
                      <p className="font-black uppercase tracking-widest">Aucun article trouvé</p>
                    </div>
                  ) : (
                    filteredPosts.map(post => (
                      <div key={post.id} className="glass p-6 rounded-3xl border-white/5 group relative overflow-hidden">
                        <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-white/5">
                          <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold mb-1 group-hover:text-brand-blue transition-colors">{post.titleKey}</h3>
                        <p className="text-[10px] text-white/40 mb-4 font-bold">{post.category} • {post.date}</p>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all absolute top-8 right-8">
                          <button onClick={() => setEditingPost(post)} className="p-3 bg-brand-blue rounded-xl text-white shadow-xl hover:scale-110 transition-transform">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm("Supprimer cet article ?")) {
                                const newPosts = posts.filter(p => p.id !== post.id);
                                setPosts(newPosts);
                                saveContent(projects, newPosts);
                              }
                            }}
                            className="p-3 bg-brand-red rounded-xl text-white shadow-xl hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="glass rounded-3xl border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Centre de Messages</h2>
              <span className="px-3 py-1 bg-brand-blue/20 text-brand-blue text-[10px] font-black rounded-full uppercase tracking-widest">
                8 Nouveaux
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { user: "Jean B.", email: "jean@example.com", msg: "Bonjour, je souhaiterais avoir un devis pour un bras robotisé...", date: "Aujourd'hui, 14:30" },
                { user: "Marie L.", email: "marie.l@tech.cf", msg: "Votre projet de recyclage est impressionnant. Collaborons !", date: "Hier, 09:15" },
                { user: "Kevin S.", email: "kevin.s@gmail.com", msg: "Est-ce que vous proposez des formations en robotique pour enfants ?", date: "12 Mai, 18:45" },
                { user: "Oumar T.", email: "oumar@gouv.cf", msg: "Invitation à l'événement Innovation Bangui 2024.", date: "10 Mai, 11:00" },
              ].map((msg, i) => (
                <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-lg">
                    {msg.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-sm group-hover:text-brand-blue transition-colors">{msg.user}</h4>
                      <span className="text-[10px] text-white/20 font-medium">{msg.date}</span>
                    </div>
                    <p className="text-xs text-white/40 mb-2">{msg.email}</p>
                    <p className="text-sm text-white/60 line-clamp-1">{msg.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-2xl font-bold">Paramètres Généraux</h2>
                <p className="text-white/40 text-sm">Configurez les informations globales de votre site.</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="glass p-8 rounded-3xl border-white/5 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Nom du Site</label>
                  <input 
                    value={settings.siteName}
                    onChange={e => setSettings({...settings, siteName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-brand-blue outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Email de Contact</label>
                  <input 
                    value={settings.contactEmail}
                    onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-brand-blue outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Téléphone</label>
                  <input 
                    value={settings.contactPhone}
                    onChange={e => setSettings({...settings, contactPhone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-brand-blue outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Adresse Physique</label>
                  <input 
                    value={settings.address}
                    onChange={e => setSettings({...settings, address: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-brand-blue outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button type="submit" className="px-12 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,82,180,0.4)]">
                  <Save className="w-5 h-5" /> Enregistrer les changements
                </button>
              </div>
            </form>

            <div className="mt-8 p-6 bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl">
              <p className="text-xs text-brand-yellow font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Note Importante
              </p>
              <p className="text-xs text-brand-yellow/60 leading-relaxed">
                Ces paramètres modifient les informations affichées dans le pied de page et sur la page de contact de votre site public.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
